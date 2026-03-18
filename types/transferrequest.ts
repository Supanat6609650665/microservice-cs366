
import { SeverityLevel } from '../types/query'
import { RowDataPacket } from 'mysql2'

export const STATUS = ["PENDING", "ACCEPTED", "REJECTED", "CONFIRMED", "ARRIVED", "COMPLETED"] as const
export type Status = typeof STATUS[number]

export interface TransferRequest{
    incidentId: string,
    hospitalId: string,
    severityLevel: SeverityLevel,
    injuryDescription: string,
    lat: number,
    lon: number,
    requestedBy: string,
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
    requestedAt: string,
    requested_by: string
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
    requestedAt: string,
    requestedBy: string
}