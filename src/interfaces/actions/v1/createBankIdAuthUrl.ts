import { UserActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        bankId: string
    }
}

export interface ActionResult {
    authUrl: string
}
