
import { db } from '../config/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { SeverityLevel } from '../types/query'
import { HospitalDB } from '../types/hospital'
import { TransferRequest, TransferRequestDB } from '../types/transferrequest'


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