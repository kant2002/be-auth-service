import { UserActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        processId: string
    }
}

export interface ActionResult {
    token: string
}
