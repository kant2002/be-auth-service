import { GrpcAppAction } from '@kant2002-diia-inhouse/diia-app'

import { ActionVersion, SessionType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import SessionService from '@services/session'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/getSessionById'

export default class GetSessionByIdAction implements GrpcAppAction {
    constructor(private readonly sessionService: SessionService) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name: string = 'getSessionById'

    readonly validationRules: ValidationSchema<CustomActionArguments['params']> = {
        id: { type: 'string' },
        userIdentifier: { type: 'string' },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { id, userIdentifier },
        } = args

        return await this.sessionService.getSessionById(id, userIdentifier)
    }
}
