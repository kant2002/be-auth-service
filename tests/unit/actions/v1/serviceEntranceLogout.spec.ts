import { AuthService } from '@kant2002-diia-inhouse/crypto'
import TestKit, { mockInstance } from '@kant2002-diia-inhouse/test'
import { ServiceEntranceTokenData, SessionType, VerifiedBaseTokenData } from '@kant2002-diia-inhouse/types'

import ServiceEntranceLogoutAction from '@actions/v1/serviceEntranceLogout'

import RefreshTokenService from '@services/refreshToken'

describe(`Action ${ServiceEntranceLogoutAction.name}`, () => {
    const testKit = new TestKit()
    const refreshTokenServiceMock = mockInstance(RefreshTokenService)
    const authServiceMock = mockInstance(AuthService)
    const serviceEntranceLoginAction = new ServiceEntranceLogoutAction(authServiceMock, refreshTokenServiceMock)

    describe('Method `handler`', () => {
        const headers = { ...testKit.session.getHeaders(), token: 'token' }

        it('should successfully serve entrance logout', async () => {
            const mockValidationData: VerifiedBaseTokenData<ServiceEntranceTokenData> = {
                sessionType: SessionType.ServiceEntrance,
                exp: 1000,
                acquirerId: Object('asd'),
                branchHashId: 'string',
                offerHashId: 'string',
                offerRequestHashId: 'string',
                mobileUid: 'string',
                refreshToken: { value: 'asd', expirationTime: 1000 },
            }

            jest.spyOn(authServiceMock, 'validate').mockResolvedValueOnce(mockValidationData)

            await serviceEntranceLoginAction.handler({ headers })

            expect(refreshTokenServiceMock.serviceEntranceLogout).toHaveBeenCalledWith(mockValidationData.refreshToken, headers.mobileUid)
        })
    })
})
