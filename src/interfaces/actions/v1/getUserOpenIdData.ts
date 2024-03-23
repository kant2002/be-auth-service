import { GetUserOpenIdDataRequest, UserOpenIdData } from '@generated/auth'

import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: GetUserOpenIdDataRequest
}

export type ActionResult = UserOpenIdData
