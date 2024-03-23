import { PlatformType, ServiceActionArguments, SessionType, TokenData } from '@kant2002-diia-inhouse/types'

export interface CustomActionArguments extends ServiceActionArguments {
    params: {
        authToken: string
        tokenSessionType: SessionType
        mobileUid?: string
        platformType?: PlatformType
        appVersion?: string
    }
}

export type ActionResult = TokenData
