import { ServiceActionArguments, TokenData } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        data: unknown
    }
}

export type ActionResult = TokenData
