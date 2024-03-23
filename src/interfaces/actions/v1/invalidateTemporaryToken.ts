import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        ticket: string
    }
}

export interface ActionResult {
    sessionId: string
    status: string
}
