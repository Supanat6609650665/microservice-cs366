
import { db } from '../config/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { SeverityLevel } from '../types/query'
import { HospitalDB } from '../types/hospital'
import { TransferRequest, TransferRequestDB, TransferRequestDetailDB } from '../types/transferrequest'
import { AppError } from '../types/error'


export const getNearestHospital = async (
    lat: number,
    lon: number,
    severitylevel: SeverityLevel
) => {

    const sql = `SELECT hospital_id, name, status, lat, lon, address,
                 available_beds, available_icu, available_emergencybed
                 FROM Hospital`
    
    const [rows] = await db.query<HospitalDB[]>(sql)

    if(!rows){
        throw new Error('Internal Server Error')
    }

    return rows
}

export const createTransferRequest = async (
    data: TransferRequest
) => {
    
    const sql = `INSERT INTO TransferRequest (incident_id, hospital_id, severity_level,
                 injury_description, lat, lon, requested_by, conscious, blood_pressure, heart_rate)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const [row] = await db.query<ResultSetHeader>(sql, [
        data.incidentId,
        data.hospitalId,
        data.severityLevel,
        data.injuryDescription,
        data.lat,
        data.lon,
        data.requestedBy,
        data.conscious,
        data.bloodPressure,
        data.heartRate
    ])

    if(row.affectedRows !== 1){
        throw new Error('Internal Server Error')
    }

    const sql2 = `SELECT tr_id, incident_id, status, hospital_id, severity_level, injury_description, conscious, blood_pressure, heart_rate, requestedAt, requested_by
                  FROM TransferRequest
                  WHERE tr_id = ?`

    const [row2] = await db.query<TransferRequestDB[]>(sql2, [row.insertId])

    if(row2[0] === undefined){
        throw new Error('Internal Server Error')
    }

    return row2[0]

}

export const getConfirmationMessage = async (
    id: number
)=> {
    const sql = `SELECT tr.tr_id as tr_id, tr.incident_id as incident_id, 
                 tr.severity_level as severity_level, tr.status as status,
                 tr.injury_description as injury_description, tr.conscious as conscious,
                 tr.blood_pressure as blood_pressure, tr.heart_rate as heart_rate,
                 tr.requestedAt as requestedAt, tr.respondedAt as respondedAt,
                 tr.requested_by as requestedBy, tr.hospital_message as hospital_message,
                 h.hospital_id as hospital_id, h.name as name, h.lat as lat, h.lon as lon,
                 h.status as hospital_status, h.address as address 
                 FROM TransferRequest as tr
                 INNER JOIN Hospital as h
                 ON tr.hospital_id = h.hospital_id
                 WHERE tr.tr_id = ?`

    const [row] = await db.query<TransferRequestDetailDB[]>(sql, [id])

    if(row[0] === undefined){
        throw new AppError(404, 'Not Found')
    }

    return row[0]
    
}