import { AppUserActionHeaders, ServiceActionArguments } from '@kant2002-diia-inhouse/types'

interface ActionHeaders extends AppUserActionHeaders {
    token: string
}

export type CustomActionArguments = ServiceActionArguments<ActionHeaders>
