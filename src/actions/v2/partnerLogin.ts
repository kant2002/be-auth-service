import { AppAction } from '@diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@diia-inhouse/types'
import { ValidationSchema } from '@diia-inhouse/validators'

import AuthTokenService from '@services/authToken'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v2/partnerLogin'

export default class PartnerLoginAction implements AppAction {
    constructor(private readonly authTokenService: AuthTokenService) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V2

    readonly name = 'partnerLogin'

    readonly validationRules: ValidationSchema<CustomActionArguments['params']> = { bearerToken: { type: 'string' } }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { bearerToken },
            headers: { traceId },
        } = args

        const token = await this.authTokenService.getPartnerAuthToken(bearerToken, traceId)

        return { token }
    }
}
