import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { ProcessCode } from '@interfaces/services'

export type CustomActionArguments = UserActionArguments

export interface ActionResult {
    processCode: ProcessCode
}
