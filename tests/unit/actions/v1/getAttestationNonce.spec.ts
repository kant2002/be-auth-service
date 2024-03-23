import TestKit, { mockInstance } from '@kant2002-diia-inhouse/test'
import { UserSession } from '@kant2002-diia-inhouse/types'

import GetAttestationNonceAction from '@actions/v1/getAttestationNonce'

import AttestationService from '@services/integrity/attestation'

describe(`Action ${GetAttestationNonceAction.name}`, () => {
    const testKit = new TestKit()
    const integrityAttestationService = mockInstance(AttestationService)
    const getAttestationNonceAction = new GetAttestationNonceAction(integrityAttestationService)

    describe('Method `handler`', () => {
        const headers = testKit.session.getHeaders()

        it('should get nonce', async () => {
            const nonce = 'nonce'

            const args = {
                headers,
                session: <UserSession>{
                    user: { identifier: 'identifier' },
                },
            }

            jest.spyOn(integrityAttestationService, 'createIntegrityChallenge').mockResolvedValueOnce(nonce)

            expect(await getAttestationNonceAction.handler(args)).toMatchObject({ nonce })
            expect(integrityAttestationService.createIntegrityChallenge).toHaveBeenCalledWith(args.session.user.identifier, args.headers)
        })
    })
})
