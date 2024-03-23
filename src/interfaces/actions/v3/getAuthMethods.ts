import { AppUserActionHeaders, ServiceActionArguments, UserSession } from '@kant2002-diia-inhouse/types'

import { AuthMethodsResponse, SchemaCode } from '@interfaces/services/userAuthSteps'

export interface CustomActionArguments extends ServiceActionArguments<AppUserActionHeaders> {
    params: {
        code: SchemaCode
        processId?: string
    }
    session?: UserSession
}

export type ActionResult = AuthMethodsResponse
