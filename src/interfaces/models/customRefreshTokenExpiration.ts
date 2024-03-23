import { Document } from 'mongoose'

import { PlatformType } from '@kant2002-diia-inhouse/types'

export interface CustomRefreshTokenExpiration {
    platformType: PlatformType
    appVersion: string
    expiration: number
}

export interface CustomRefreshTokenExpirationModel extends CustomRefreshTokenExpiration, Document {}
