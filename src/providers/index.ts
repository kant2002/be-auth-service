import { asClass } from 'awilix'

import { DepsResolver } from '@kant2002-diia-inhouse/diia-app'

import EnemyTrackProvider from '@providers/enemyTrack/telegramBot'

import { ProvidersDeps } from '@interfaces/providers'

export function getProvidersDeps(): DepsResolver<ProvidersDeps> {
    return {
        enemyTrackProvider: asClass(EnemyTrackProvider).singleton(),
    }
}
