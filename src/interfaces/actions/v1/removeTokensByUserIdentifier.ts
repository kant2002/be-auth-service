import { RemoveTokensByUserIdentifierRequest } from '@generated/auth'

import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: RemoveTokensByUserIdentifierRequest
}

export type ActionResult = void
