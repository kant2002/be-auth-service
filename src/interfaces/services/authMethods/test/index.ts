import { Gender } from '@kant2002-diia-inhouse/types'

export interface TestUserDTO {
    fName: string
    lName: string
    mName: string
    inn: string
    passportSeries: string
    passportNumber: string
    email: string
    phoneNumber: string
    addressOfRegistration: string
    addressOfBirth: string
    birthDay: string
    gender: Gender
}
