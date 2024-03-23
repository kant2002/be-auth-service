import { GrpcService } from '@kant2002-diia-inhouse/diia-app'

import { AnalyticsService } from '@kant2002-diia-inhouse/analytics'
import { CryptoDeps } from '@kant2002-diia-inhouse/crypto'
import { DatabaseService } from '@kant2002-diia-inhouse/db'
import { BankIdCryptoServiceClient, CryptoDocServiceClient } from '@kant2002-diia-inhouse/diia-crypto-client'
import { ExternalCommunicatorChannel, QueueDeps } from '@kant2002-diia-inhouse/diia-queue'
import { HealthCheck } from '@kant2002-diia-inhouse/healthcheck'
import { HttpDeps } from '@kant2002-diia-inhouse/http'
import { I18nService } from '@kant2002-diia-inhouse/i18n'
import { RedisDeps } from '@kant2002-diia-inhouse/redis'

import Utils from '@src/utils'

import { AppConfig } from '@interfaces/config'

export type InternalDeps = {
    appUtils: Utils
}

export interface GrpcClientsDeps {
    bankIdCryptoServiceClient: BankIdCryptoServiceClient
    cryptoDocServiceClient: CryptoDocServiceClient
}

export type AppDeps = {
    config: AppConfig
    healthCheck: HealthCheck
    database: DatabaseService
    i18nService: I18nService
    externalChannel: ExternalCommunicatorChannel
    analytics: AnalyticsService
    grpcService: GrpcService
} & InternalDeps &
    QueueDeps &
    RedisDeps &
    HttpDeps &
    Required<CryptoDeps> &
    GrpcClientsDeps
