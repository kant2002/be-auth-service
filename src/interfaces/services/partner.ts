import { ObjectId } from 'bson'

import { PartnerScopes } from '@kant2002-diia-inhouse/types'

export interface GetPartnerResult {
    _id: ObjectId
    scopes: PartnerScopes
}
