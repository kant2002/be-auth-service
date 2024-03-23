import { v4 } from 'uuid'

import { RefreshToken } from '@kant2002-diia-inhouse/types'

export class GenerateRefreshTokenHelper {
    value: string

    readonly expirationTime: number

    constructor(lifetime: number, now: number = Date.now(), value: string = v4()) {
        this.expirationTime = now + lifetime
        this.value = value
    }

    asPlain(): RefreshToken {
        return { value: this.value, expirationTime: this.expirationTime }
    }
}
