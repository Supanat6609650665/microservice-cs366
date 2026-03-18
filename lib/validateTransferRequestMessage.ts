
import { TransferRequestMessage } from '../types/message'
import { isSeverityLevel } from '../lib/validateSeverityLevel'
import { isStatus } from '../lib/validateStatus'

export const isTransferRequestMessage = (
    data: unknown
): data is TransferRequestMessage => {
    if(typeof data !== "object" || data === null){
        return false
    }

    const trMessage = data as Record<string, unknown>

    return (
        typeof trMessage.trId === "number" &&
        typeof trMessage.hospitalId === "string" &&
        typeof trMessage.severityLevel === "string" &&
        isSeverityLevel(trMessage.severityLevel) &&
        typeof trMessage.injuryDescription === "string" &&
        typeof trMessage.status === "string" &&
        isStatus(trMessage.status) &&
        typeof trMessage.requestedAt === "string" &&
        typeof trMessage.requestedBy === "string" &&
        (typeof trMessage.conscious === "boolean" || trMessage.conscious === undefined) &&
        (typeof trMessage.bloodPressure === "string" || trMessage.bloodPressure === undefined) &&
        (typeof trMessage.heartRate === "number" || trMessage.heartRate === undefined)

    )
}