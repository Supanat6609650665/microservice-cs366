
import { SeverityLevel } from '../types/query'
import { Status } from '../types/transferrequest'

export interface TransferRequestMessage{
    trId: number,
    hospitalId: string,
    severityLevel: SeverityLevel,
    injuryDescription: string,
    status: Status,
    conscious?: boolean,
    bloodPressure?: string,
    heartRate?: number,
    requestedAt: string,
    requestedBy: string
}

export interface HospitalDecisionMessage{
    trId: number,
    status: Status,
    message: string,
    requestedAt: string,
    respondedAt: string,
    requestedBy: string
}