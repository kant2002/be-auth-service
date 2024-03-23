import { ActHeaders } from '@kant2002-diia-inhouse/types'

import { ExternalResponseBaseEventPayload } from '@interfaces/externalEventListeners'
import { IntegrityResultData } from '@interfaces/models/integrity/googleIntegrityCheck'

export interface EventPayload extends ExternalResponseBaseEventPayload {
    response?: {
        userIdentifier: string
        headers: ActHeaders
        integrityResultData: IntegrityResultData
    }
}
