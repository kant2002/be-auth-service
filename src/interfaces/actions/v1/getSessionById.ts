import { GetSessionByIdRequest, SessionByIdResponse } from '@generated/auth'

import { ServiceActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: GetSessionByIdRequest
}

export type ActionResult = SessionByIdResponse
