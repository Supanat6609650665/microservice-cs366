
import { SeverityLevel } from '../types/query'
import { RowDataPacket } from 'mysql2'

export type Status = "PENDING" | "ACCEPTED" | "REJECTED" | "CONFIRMED" | "ARRIVED" | "COMPLETED"

export interface TransferRequest{
    incidentId: string,
    hospitalId: string,
    severityLevel: SeverityLevel,
    injuryDescription: string,
    lat: number,
    lon: number,
    conscious?: boolean | null,
    bloodPressure?: string | null,
    heartRate?: number | null
}

export interface TransferRequestDB extends RowDataPacket{
    tr_id: number,
    incident_id: string,
    status: Status,
    hospital_id: string,
    severity_level: SeverityLevel,
    injury_description: string,
    conscious: boolean | null,
    blood_pressure: string | null,
    heart_rate: number | null,
    requestedAt: string
}

export interface TransferRequestDTO{
    trId: number,
    incidentId: string,
    status: Status,
    hospitalId: string,
    severityLevel: SeverityLevel,
    injuryDescription: string,
    conscious: boolean | null,
    bloodPressure: string | null,
    heartRate: number | null,
    requestedAt: string
}