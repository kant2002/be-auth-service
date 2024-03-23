import { MoleculerService } from '@kant2002-diia-inhouse/diia-app'

import { mockInstance } from '@kant2002-diia-inhouse/test'
import { ActionVersion } from '@kant2002-diia-inhouse/types'

import DiiaSignatureService from '@services/diiaSignature'

describe(`${DiiaSignatureService.name}`, () => {
    const mockMoleculerService = mockInstance(MoleculerService)
    const backOfficePetitionService = new DiiaSignatureService(mockMoleculerService)

    describe('method: `getSignature`', () => {
        it('should return signature', async () => {
            const mockRequestId = 'requestId'
            const mockSignature = 'signature'
            const mockSignedItems = { signedItems: [{ name: 'name', signature: 'signature' }] }

            jest.spyOn(mockMoleculerService, 'act').mockResolvedValueOnce(mockSignedItems)

            expect(await backOfficePetitionService.getSignature(mockRequestId)).toBe(mockSignature)
            expect(mockMoleculerService.act).toHaveBeenCalledWith(
                'DiiaSignature',
                { name: 'getSignedData', actionVersion: ActionVersion.V1 },
                { params: { requestId: mockRequestId } },
            )
            expect(mockMoleculerService.act).toHaveBeenCalledTimes(1)
        })
    })
})
