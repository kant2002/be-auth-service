import { AnalyticsActionResult } from '@kant2002-diia-inhouse/analytics'
import { AuthService, IdentifierService } from '@kant2002-diia-inhouse/crypto'
import { EnvService } from '@kant2002-diia-inhouse/env'
import { BadRequestError } from '@kant2002-diia-inhouse/errors'
import {
    AppUserActionHeaders,
    AuthDocument,
    AuthDocumentType,
    AuthEntryPoint,
    Gender,
    Logger,
    RefreshToken,
    SessionType,
    User,
    UserTokenData,
} from '@kant2002-diia-inhouse/types'
import { utils } from '@kant2002-diia-inhouse/utils'

import Utils from '@src/utils'

import AuthTokenService from '@services/authToken'
import CustomRefreshTokenExpirationService from '@services/customRefreshTokenExpiration'
import EisVerifier from '@services/eisVerifier'
import NotificationService from '@services/notification'
import RefreshTokenService from '@services/refreshToken'
import UserService from '@services/user'
import UserAuthTokenService from '@services/userAuthToken'

import { AppConfig } from '@interfaces/config'
import { ProvidedUserData, testTarget } from '@interfaces/services/test'
import { GenerateTokenResult } from '@interfaces/services/userAuthToken'

export default class TestAuthTokenService {
    constructor(
        private readonly config: AppConfig,
        private readonly logger: Logger,
        private readonly identifier: IdentifierService,
        private readonly auth: AuthService,
        private readonly envService: EnvService,

        private readonly appUtils: Utils,
        private readonly authTokenService: AuthTokenService,
        private readonly eisVerifierService: EisVerifier,
        private readonly customRefreshTokenExpirationService: CustomRefreshTokenExpirationService,
        private readonly notificationService: NotificationService,
        private readonly userService: UserService,
        private readonly userAuthTokenService: UserAuthTokenService,
        private readonly refreshTokenService: RefreshTokenService,
    ) {}

    async getUserToken(requestId: string, headers: AppUserActionHeaders, providedUserData: ProvidedUserData): Promise<GenerateTokenResult> {
        const { mobileUid, traceId, platformType, platformVersion, appVersion } = headers
        if (this.config.auth.testAuthByItnIsEnabled === false) {
            this.logger.info('Provider test is not implemented')

            throw new BadRequestError('Validation failed')
        }

        this.logger.info('Start receiving test token', { requestId, mobileUid, traceId, providedUserData })

        const user: User = this.getTestData(requestId, providedUserData)

        const { birthDay, itn } = user
        const identifier: string = this.identifier.createIdentifier(itn)

        await this.authTokenService.clearUserSessionData(identifier, mobileUid)

        await this.eisVerifierService.verify(requestId, headers)

        const sessionType: SessionType = SessionType.User
        const authEntryPoint: AuthEntryPoint = {
            target: testTarget,
            isBankId: false,
        }

        const customLifetime = await this.customRefreshTokenExpirationService.getByPlatformTypeAndAppVersion(platformType, appVersion)

        const refreshToken: RefreshToken = await this.refreshTokenService.create(
            traceId,
            sessionType,
            { mobileUid, authEntryPoint, customLifetime, userIdentifier: identifier },
            headers,
        )

        this.logger.debug('User data to encrypt', user)

        const tokenData: UserTokenData = {
            ...user,
            identifier,
            mobileUid,
            authEntryPoint,
            refreshToken,
            sessionType,
        }

        const isValidItn = utils.isItnChecksumValid(itn)
        if (!isValidItn) {
            this.logger.info('rnokpp is not valid', {
                analytics: {
                    date: new Date().toISOString(),
                    category: 'auth',
                    action: {
                        type: 'validation',
                        result: AnalyticsActionResult.Error,
                    },
                    identifier,
                    appVersion,
                    device: {
                        identifier: mobileUid,
                        platform: {
                            type: platformType,
                            version: platformVersion,
                        },
                    },
                    data: {
                        ...authEntryPoint,
                        reason: 'rnokpp is not valid',
                        parameters: {
                            invalidItn: itn,
                        },
                    },
                },
            })
        }

        this.authTokenService.checkForValidItn(itn)

        const token: string = await this.auth.getJweInJwt(tokenData)

        const tasks: Promise<void>[] = [this.notificationService.assignUserToPushToken(mobileUid, identifier)]
        if (this.appUtils.findDateFormat(birthDay) && !this.envService.isProd()) {
            tasks.push(this.userService.createOrUpdateProfile(tokenData, headers, SessionType.User))
        } else {
            this.logger.error(`Invalid birth day format [${birthDay}]`)
        }

        await Promise.all(tasks)

        await this.userAuthTokenService.sendAuthNotification(tokenData, mobileUid)

        return { token, identifier, tokenData }
    }

    getTestData(itn: string, providedUserData: ProvidedUserData): User {
        const documentValue = 'АБ654321-notvalid'
        const testData: User = {
            fName: 'АНЖЕЛІКА',
            lName: 'ПАШУЛЬ',
            mName: 'В`ЯЧЕСЛАВІВНА',
            itn,
            passport: documentValue,
            document: {
                value: documentValue,
                type: this.appUtils.getDocumentType(documentValue),
            },
            email: 'ostapenko@example.com',
            phoneNumber: '+380998887766',
            birthDay: '01.01.2000',
            addressOfRegistration: '',
            addressOfBirth: '',
            gender: Gender.female,
        }

        const providedUserDataKeys = <(keyof ProvidedUserData)[]>(<unknown>Object.keys(providedUserData))

        providedUserDataKeys.forEach((key) => {
            const userValue = providedUserData[key]
            if (!userValue) {
                if (this.isNoMockField(key)) {
                    testData[key] = ''
                }

                return
            }

            if (key === 'birthDay') {
                testData[key] = this.appUtils.normalizeBirthDay(userValue)
            } else if (key === 'document') {
                const documentType: AuthDocumentType = this.appUtils.getDocumentType(userValue)
                const document: AuthDocument = {
                    value: this.appUtils.normalizeDocumentValue(userValue, documentType),
                    type: documentType,
                }

                testData[key] = document
                testData.passport = document.value
            } else if (key === 'fName' || key === 'lName' || key === 'mName') {
                testData[key] = utils.capitalizeName(userValue)
            } else if (key === 'gender') {
                testData[key] = providedUserData[key]!
            } else {
                testData[key] = providedUserData[key]!
            }
        })

        return testData
    }

    private isNoMockField(key: string): key is 'mName' | 'email' {
        return ['mName', 'email'].includes(key)
    }
}
