import { Gender } from '@kant2002-diia-inhouse/types'

export const testTarget = 'Test'

export interface ProvidedUserData {
    fName?: string
    lName?: string
    mName?: string
    birthDay?: string
    gender?: Gender
    document?: string
    addressOfRegistration?: string
    email?: string
}
