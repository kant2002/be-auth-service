import { UserActionArguments } from '@kant2002-diia-inhouse/types'

import { FaceLivenessDetectionConfigResponse } from '@interfaces/services/authSchema'

export interface CustomActionArguments extends UserActionArguments {
    params: {
        isLowRamDevice?: boolean
        builtInTrueDepthCamera?: boolean
    }
}

export interface ActionResult {
    fld: FaceLivenessDetectionConfigResponse
}
