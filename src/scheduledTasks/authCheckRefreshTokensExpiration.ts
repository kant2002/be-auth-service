import { EventBusListener, ScheduledTaskEvent } from '@kant2002-diia-inhouse/diia-queue'

import RefreshTokenService from '@services/refreshToken'

export default class AuthCheckRefreshTokensExpirationScheduledTask implements EventBusListener {
    constructor(private refreshTokenService: RefreshTokenService) {}

    readonly event: ScheduledTaskEvent = ScheduledTaskEvent.AuthCheckRefreshTokensExpiration

    async handler(): Promise<void> {
        await this.refreshTokenService.checkRefreshTokensExpiration()
    }
}
