import { ActHeaders, ServiceUserActionArguments } from '@kant2002-diia-inhouse/types'

interface ActionHeaders extends ActHeaders {
    token: string
}

export type CustomActionArguments = ServiceUserActionArguments<ActionHeaders>

export interface ActionResult {
    token: string
}
