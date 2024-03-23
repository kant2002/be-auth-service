import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        token: string
    }
}

export interface ActionResult {
    token: string
}
