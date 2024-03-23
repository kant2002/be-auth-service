import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { Session } from '@interfaces/services/session'

export type CustomActionArguments = UserActionArguments

export interface ActionResult {
    sessions: Session[]
}
