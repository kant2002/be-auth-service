import { ServiceActionArguments, TemporaryActionHeaders } from '@kant2002-diia-inhouse/types'

export type CustomActionArguments = ServiceActionArguments<TemporaryActionHeaders>

export interface ActionResult {
    token: string
}
