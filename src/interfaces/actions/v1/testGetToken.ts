import { AppUserActionHeaders, Gender, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments<AppUserActionHeaders> {
    params: {
        requestId: string
        fName?: string
        lName?: string
        mName?: string
        email?: string
        birthDay?: string
        gender?: Gender
        document?: string
        addressOfRegistration?: string
    }
}

export interface ActionResult {
    token: string
    channelUuid: string
}
