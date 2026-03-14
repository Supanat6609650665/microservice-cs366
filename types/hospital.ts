
import { RowDataPacket } from 'mysql2'

export type Status = "OPEN" | "CLOSED" | "OVERLOADED"

export interface HospitalDB extends RowDataPacket{
    hospital_id: string,
    name: string,
    status: Status,
    lat: string,
    lon: string,
    address: string,
    available_beds: number,
    available_icu: number,
    available_emergencybed: number
}

export interface HospitalDTO{
    hospitalId: string,
    name: string,
    status: Status,
    lat: string,
    lon: string,
    address: string,
    availableBeds: number,
    availableICU: number,
    availableEmergencyBed: number
}