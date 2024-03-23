import { AppAction } from '@kant2002-diia-inhouse/diia-app'

import { IdentifierService } from '@kant2002-diia-inhouse/crypto'
import { ActionVersion, Gender, SessionType } from '@kant2002-diia-inhouse/types'
import { ValidationSchema } from '@kant2002-diia-inhouse/validators'

import TestService from '@services/test'

import { ActionResult, CustomActionArguments } from '@interfaces/actions/v1/testGetToken'

export default class TestGetTokenAction implements AppAction {
    constructor(
        private readonly identifier: IdentifierService,

        private readonly testService: TestService,
    ) {}

    readonly sessionType: SessionType = SessionType.None

    readonly actionVersion: ActionVersion = ActionVersion.V1

    readonly name = 'testGetToken'

    private genderAllowedValues: string[] = [...Object.values(Gender), '']

    readonly validationRules: ValidationSchema = {
        requestId: { type: 'string' },
        fName: { type: 'string', optional: true },
        lName: { type: 'string', optional: true },
        mName: { type: 'string', optional: true },
        email: { type: 'string', optional: true },
        birthDay: { type: 'string', optional: true },
        gender: { type: 'string', enum: this.genderAllowedValues, optional: true },
        document: { type: 'string', optional: true },
        addressOfRegistration: { type: 'string', optional: true },
    }

    async handler(args: CustomActionArguments): Promise<ActionResult> {
        const {
            params: { requestId, fName, lName, mName, email, birthDay, gender, document, addressOfRegistration },
            headers,
        } = args

        const { token, identifier } = await this.testService.getUserToken(requestId, headers, {
            fName,
            lName,
            mName,
            email,
            birthDay,
            gender,
            document,
            addressOfRegistration,
        })

        const channelUuid: string = this.identifier.createIdentifier(identifier)

        return { token, channelUuid }
    }
}
