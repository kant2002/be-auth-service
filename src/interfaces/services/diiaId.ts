import { UserActionHeaders } from '@kant2002-diia-inhouse/types'

export enum DiiaIdAction {
    Creation = 'creation',
    Signing = 'signing',
    CreationAndSigning = 'creationAndSigning',
}

export type DiiaIdHeaders = UserActionHeaders
