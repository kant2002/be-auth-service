import { PortalUser, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: PortalUser
}

export interface ActionResult {
    token: string
}
