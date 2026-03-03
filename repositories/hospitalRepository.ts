
import { db } from '../config/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

interface User extends RowDataPacket {
    status: string,
    hospital_id: string,
    severity_level: string,
    injury_description: string,
    conscious: number | null,
    blood_pressure: string | null,
    heart_rate: number
}

export const getNearestHospital = async (
    lat: string,
    lon: string,
    severitylevel: string
) => {

    const sql = "SELECT * FROM Hospital"
    
    const [rows] = await db.query(sql)

    return rows
}

export const createTransferRequest = async (
    request: any
) => {
    
    const sql = `INSERT INTO TransferRequest (incident_id, hospital_id, severity_level,
                 injury_description, lat, lon, conscious, blood_pressure, heart_rate)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const [row] = await db.query<ResultSetHeader>(sql, [
        request.incidentId,
        request.hospitalId,
        request.severityLevel,
        request.injuryDescription,
        request.lat,
        request.lon,
        request.conscious,
        request.bloodPressure,
        request.heartRate
    ])

    const sql2 = `SELECT status, hospital_id, severity_level, injury_description, conscious, blood_pressure, heart_rate
                  FROM TransferRequest
                  WHERE tr_id = ?`

    const [row2] = await db.query<User[]>(sql2, [row.insertId])

    let res: any = {
        trId: row.insertId,
        hospitalId: row2[0]?.hospital_id,
        status: row2[0]?.status,
        message: 'Waiting for Hospital Confirmation',
        severityLevel: row2[0]?.severity_level,
        injuryDescription: row2[0]?.injury_description
    }

    if(row2[0]?.conscious !== null){
        res.conscious = row2[0]?.conscious
    }

    if(row2[0]?.blood_pressure){
        res.bloodPressure = row2[0].blood_pressure
    }

    if(row2[0]?.heart_rate){
        res.heartRate = row2[0].heart_rate
    }

    return res

}