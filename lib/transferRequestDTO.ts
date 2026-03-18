
import { TransferRequestDB, TransferRequestDTO } from '../types/transferrequest'

export const transferRequestDTO = (
    row: TransferRequestDB
): TransferRequestDTO => {
    const transferRequest = {
        trId: row.tr_id,
        incidentId: row.incident_id,
        status: row.status,
        hospitalId: row.hospital_id,
        severityLevel: row.severity_level,
        injuryDescription: row.injury_description,
        conscious: row.conscious,
        bloodPressure: row.blood_pressure,
        heartRate: row.heart_rate,
        requestedAt: row.requestedAt,
        requestedBy: row.requested_by
    }

    return transferRequest
}