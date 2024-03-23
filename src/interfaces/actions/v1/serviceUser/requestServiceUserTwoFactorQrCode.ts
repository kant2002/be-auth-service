import { ServiceUserActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceUserActionArguments {
    params: {
        login: string
    }
}

export interface ActionResult {
    success: boolean
}
