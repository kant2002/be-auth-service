import { CompleteUserAuthStepsRequest } from '@generated/auth'

import { UserActionArguments } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends UserActionArguments {
    params: CompleteUserAuthStepsRequest
}

export type ActionResult = void
