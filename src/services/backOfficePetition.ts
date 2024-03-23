import { MoleculerService } from '@kant2002-diia-inhouse/diia-app'

import { ActionVersion, PortalUserPermissions } from '@kant2002-diia-inhouse/types'

export default class BackOfficePetitionService {
    constructor(private readonly moleculer: MoleculerService) {}

    private readonly serviceName: string = 'BackOfficePetition'

    async getPortalUserPermissions(userIdentifier: string): Promise<PortalUserPermissions> {
        return await this.moleculer.act(
            this.serviceName,
            { name: 'getPortalUserPermissions', actionVersion: ActionVersion.V1 },
            { params: { userIdentifier } },
        )
    }
}
