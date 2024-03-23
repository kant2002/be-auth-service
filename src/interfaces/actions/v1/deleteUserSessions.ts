import { UserActionArguments } from '@kant2002-diia-inhouse/types'

export type CustomActionArguments = UserActionArguments

export type ActionResult = never | { success: true }
