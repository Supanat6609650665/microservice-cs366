
import { TransferRequest } from '../types/transferrequest'
import { isSeverityLevel } from './validateSeverityLevel'

export const isTransferRequest = (
    data: unknown
): data is TransferRequest => {
    if(typeof data !== "object" || data === null){
        return false
    }

    const transferRequest = data as Record<string, unknown>

    return (
        typeof transferRequest.incidentId === "string" &&
        typeof transferRequest.hospitalId === "string" &&
        typeof transferRequest.severityLevel === "string" && 
        isSeverityLevel(transferRequest.severityLevel) &&
        typeof transferRequest.injuryDescription === "string" &&
        typeof transferRequest.lat === "number" &&
        typeof transferRequest.lon === "number" &&
        (typeof transferRequest.conscious === "boolean" || transferRequest.conscious === undefined) &&
        (typeof transferRequest.bloodPressure === "string" || transferRequest.bloodPressure === undefined) &&
        (typeof transferRequest.heartRate === "number" || transferRequest.heartRate === undefined)
    )
}