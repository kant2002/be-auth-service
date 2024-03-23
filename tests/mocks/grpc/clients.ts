import { GrpcClientFactory } from '@kant2002-diia-inhouse/diia-app'

import { BankIdCryptoServiceDefinition, CryptoDocServiceDefinition } from '@kant2002-diia-inhouse/diia-crypto-client'
import DiiaLogger from '@kant2002-diia-inhouse/diia-logger'
import { MetricsService } from '@kant2002-diia-inhouse/diia-metrics'
import { mockInstance } from '@kant2002-diia-inhouse/test'

const grpcClientFactory = new GrpcClientFactory('Auth', new DiiaLogger(), mockInstance(MetricsService))

export const cryptoDocServiceClient = grpcClientFactory.createGrpcClient(CryptoDocServiceDefinition, 'test', 'crypto')

export const bankIdCryptoServiceClient = grpcClientFactory.createGrpcClient(BankIdCryptoServiceDefinition, 'test', 'crypto')
