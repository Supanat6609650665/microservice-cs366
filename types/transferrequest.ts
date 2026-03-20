
import { SeverityLevel } from '../types/query'
import { RowDataPacket } from 'mysql2'
import { HospitalStatus } from '../types/hospital'

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

export interface TransferRequestDetailDB extends RowDataPacket{
    tr_id: number,
    incident_id: string,
    severity_level: SeverityLevel,
    status: Status,
    injury_description: string,
    conscious: boolean | null,
    blood_pressure: string | null,
    heart_rate: number | null,
    requestedAt: string,
    respondedAt: string | null,
    requestedBy: string,
    hospital_message: string,
    hospital_id: string,
    name: string,
    lat: string,
    lon: string,
    hospital_status: HospitalStatus,
    address: string
}

export interface TransferRequestDetailDTO{
    trId: number
    status: Status,
    hospitalMessage: string,
    requestedAt: string,
    respondedAt: string | null,
    requestedBy: string,
    transferRequestDetail: {
        incidentId: string,
        severityLevel: string,
        injuryDescription: string,
        conscious?: boolean,
        bloodPressure?: string,
        heartRate?: number,
    },
    hospitalDetail: {
        hospitalId: string,
        name: string,
        lat: string,
        lon: string,
        hospitalStatus: HospitalStatus,
        address: string
    }
}