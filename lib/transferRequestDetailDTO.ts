
import { TransferRequestDetailDB, TransferRequestDetailDTO } from '../types/transferrequest'

export const transferRequestDetailDTO = (
    data: TransferRequestDetailDB
): TransferRequestDetailDTO => {
    const trDetail: TransferRequestDetailDTO = {
        trId: data.tr_id,
        status: data.status,
        hospitalMessage: data.hospital_message,
        requestedAt: data.requestedAt,
        respondedAt: data.respondedAt,
        requestedBy: data.requestedBy,
        transferRequestDetail: {
            incidentId: data.incident_id,
            severityLevel: data.severity_level,
            injuryDescription: data.injury_description,
            ...(data.conscious !== null
                ?
                {
                    conscious: data.conscious ? true : false
                }
                :
                {}
            ),
            ...(data.blood_pressure
                ?
                {
                    bloodPressure: data.blood_pressure
                }
                :
                {}
            ),
            ...(data.heart_rate
                ?
                {
                    heartRate: data.heart_rate
                }
                :
                {}
            )
        },
        hospitalDetail: {
            hospitalId: data.hospital_id,
            name: data.name,
            lat: data.lat,
            lon: data.lon,
            hospitalStatus: data.hospital_status,
            address: data.address
        }
    }

    return trDetail
}