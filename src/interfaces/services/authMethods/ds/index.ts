import { SignOwnerInfo } from '@kant2002-diia-inhouse/diia-crypto-client'

import { AuthMethod } from '@interfaces/models/authSchema'

export interface DsUserDTO extends SignOwnerInfo {
    authMethod: AuthMethod.Ds
}
