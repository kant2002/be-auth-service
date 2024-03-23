import { AppUserActionHeaders, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments<AppUserActionHeaders> {
    params: {
        otp: string
    }
}

export interface ActionResult {
    token: string
}
