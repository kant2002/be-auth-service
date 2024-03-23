import { initTracing } from '@kant2002-diia-inhouse/diia-app'

const serviceName = 'Auth'

initTracing(serviceName)

import 'module-alias/register'
import { bootstrap } from './bootstrap'

bootstrap(serviceName)
