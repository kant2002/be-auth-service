import { AppAction } from '@kant2002-diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import TwoFactorService from '@services/twoFactor'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/serviceUser/requestServiceUserTwoFactorQrCode'

export default class RequestServiceUserTwoFactorQrCodeAction implements AppAction {
    constructor(private readonly twoFactorService: TwoFactorService) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name = 'requestServiceUserTwoFactorQrCode'

    readonly validationRules: ValidationSchema = { login: { type: 'string' } }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { login },
        } = args

        await this.twoFactorService.requestServiceUserAuthQrCode(login)

        return { success: true }
    }
}
