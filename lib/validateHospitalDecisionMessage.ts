
import { HospitalDecisionMessage } from '../types/message'
import { isStatus } from '../lib/validateStatus'

export const isHospitalDecisionMessage = (
    data: unknown
): data is HospitalDecisionMessage => {
    if(typeof data !== "object" || data === null){
        return false
    }

    const hdMessage = data as Record<string, unknown>

    return (
        typeof hdMessage.trId === "number" &&
        typeof hdMessage.status === "string" &&
        isStatus(hdMessage.status) &&
        typeof hdMessage.message === "string" &&
        typeof hdMessage.requestedAt === "string" &&
        typeof hdMessage.respondedAt === "string" &&
        typeof hdMessage.requestedBy === "string"
    )
}