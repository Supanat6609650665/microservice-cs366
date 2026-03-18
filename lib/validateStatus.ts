
import { STATUS, Status } from '../types/transferrequest'

export const isStatus = (
    status: string
): status is Status => {
    return STATUS.includes(status as Status)
}