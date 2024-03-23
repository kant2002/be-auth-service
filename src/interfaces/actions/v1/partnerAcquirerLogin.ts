import { PartnerActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends PartnerActionArguments {
    params: {
        acquirerId: string
    }
}

export interface ActionResult {
    token: string
}
