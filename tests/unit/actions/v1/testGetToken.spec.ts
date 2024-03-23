import { IdentifierService } from '@kant2002-diia-inhouse/crypto'
import TestKit, { mockInstance } from '@kant2002-diia-inhouse/test'
import { Gender } from '@kant2002-diia-inhouse/types'

import TestGetTokenAction from '@actions/v1/testGetToken'

import TestAuthTokenService from '@services/test'

import { AuthUser } from '@interfaces/services/userAuthToken'

describe(`Action ${TestGetTokenAction.name}`, () => {
    const identifierService = new IdentifierService({ salt: 'salt' })
    const testKit = new TestKit()
    const testAuthTokenServiceMock = mockInstance(TestAuthTokenService)
    const testGetTokenAction = new TestGetTokenAction(identifierService, testAuthTokenServiceMock)

    describe('Method `handler`', () => {
        const headers = testKit.session.getHeaders()
        const args = {
            headers,
            params: {
                requestId: 'requestId',
                fName: 'fName',
                lName: 'lName',
                mName: 'mName',
                email: 'email',
                birthDay: 'birthDay',
                gender: Gender.male,
                document: 'document',
                addressOfRegistration: 'addressOfRegistration',
            },
        }

        it('should get token with channelUuid', async () => {
            const mockTokenResult = {
                token: 'string',
                identifier: 'string',
                tokenData: <AuthUser>{},
            }

            jest.spyOn(testAuthTokenServiceMock, 'getUserToken').mockResolvedValueOnce(mockTokenResult)

            const channelUuid = 'channelUuid'

            jest.spyOn(identifierService, 'createIdentifier').mockReturnValueOnce(channelUuid)

            expect(await testGetTokenAction.handler(args)).toMatchObject({ token: mockTokenResult.token, channelUuid })

            const { requestId, ...paramsWithoutRequestId } = args.params

            expect(testAuthTokenServiceMock.getUserToken).toHaveBeenCalledWith(args.params.requestId, args.headers, paramsWithoutRequestId)
            expect(identifierService.createIdentifier).toHaveBeenCalledWith(mockTokenResult.identifier)
        })
    })
})
