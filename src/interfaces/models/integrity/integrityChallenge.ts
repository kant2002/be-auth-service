import { ActHeaders } from '@kant2002-diia-inhouse/types'

import { ExternalResponseEventError } from '@interfaces/externalEventListeners'

export interface IntegrityChallenge {
    userIdentifier: string
    mobileUid: string
    nonce: string
    headers: ActHeaders
    error?: ExternalResponseEventError
}
