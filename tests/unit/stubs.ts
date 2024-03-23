import { ApiError, ErrorData } from '@kant2002-diia-inhouse/errors'

export class MongoDbApiError extends ApiError {
    keyValue: ErrorData | undefined

    constructor(message: string, code: number, data?: ErrorData) {
        super(message, code)

        this.keyValue = data
    }
}
