import { ActHeaders } from '@kant2002-diia-inhouse/types'

import { ExternalResponseBaseEventPayload } from '@interfaces/externalEventListeners/index'
import { HuaweiIntegrityResultData } from '@interfaces/models/integrity/huaweiIntegrityCheck'

export interface EventPayload extends ExternalResponseBaseEventPayload {
    response?: {
        userIdentifier: string
        headers: ActHeaders
        integrityResultData: HuaweiIntegrityResultData
    }
}
