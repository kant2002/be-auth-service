import { EventBusListener, ExternalEvent } from '@kant2002-diia-inhouse/diia-queue'
import { BadRequestError } from '@kant2002-diia-inhouse/errors'
import { AuthDocumentType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import NfcService from '@services/nfc'

import { EventPayload } from '@interfaces/externalEventListeners/saveNfcScanResult'
import { GenderAsSex } from '@interfaces/services/authMethods'

export default class SaveNfcScanResultEventListener implements EventBusListener {
    constructor(private readonly nfcService: NfcService) {}

    readonly event: ExternalEvent = ExternalEvent.AuthSaveNfcScanResult

    validationRules: ValidationSchema = {
        payload: {
            type: 'object',
            optional: true,
            props: {
                uuid: { type: 'string' },
                request: {
                    type: 'object',
                    optional: true,
                    props: {
                        mobileUid: { type: 'string' },
                        scanResult: {
                            type: 'object',
                            props: {
                                docType: { type: 'string', enum: Object.values(AuthDocumentType) },
                                docSerie: { type: 'string', optional: true },
                                docNumber: { type: 'string' },
                                firstName: { type: 'string' },
                                lastName: { type: 'string' },
                                middleName: { type: 'string', optional: true },
                                itn: { type: 'string', optional: true },
                                recordNumber: { type: 'string' },
                                birthDay: { type: 'string' },
                                photo: { type: 'string', optional: true },
                                gender: { type: 'string', enum: Object.values(GenderAsSex) },
                                issuingState: { type: 'string', optional: true },
                                international: { type: 'boolean', optional: true },
                            },
                        },
                    },
                },
            },
        },

        error: {
            type: 'object',
            optional: true,
            props: {
                message: { type: 'string' },
                http_code: { type: 'number' },
            },
        },
    }

    async handler(message: EventPayload): Promise<string> {
        const { error, request } = message

        if (error || !request) {
            throw new BadRequestError('Error on saveScanResult', { error })
        }

        const { mobileUid, scanResult } = request

        return await this.nfcService.saveNfcScanResult(mobileUid, scanResult)
    }
}
