import { ActHeaders, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

interface ActionHeaders extends ActHeaders {
    ticket: string
}

export type CustomActionArguments = ServiceActionArguments<ActionHeaders>

export interface ActionResult {
    sessionId: string
    status: string
}
