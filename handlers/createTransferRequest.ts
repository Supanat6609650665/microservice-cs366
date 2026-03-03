
import { createTransferRequestService } from '../services/hospitalService'
import { publishTransferRequestCreated } from '../events/transferRequestCreated'

export const createTransferRequest = async (event: any) => {

    const req = JSON.parse(event.body)

    const request = {
        incidentId: req.incidentId,
        hospitalId: req.hospitalId,
        severityLevel: req.severityLevel,
        injuryDescription: req.injuryDescription,
        lat: req.lat,
        lon: req.lon,
        conscious: req.conscious ? req.conscious : null,
        bloodPressure: req.bloodPressure ? req.bloodPressure : null,
        heartRate: req.heartRate ? req.heartRate : null
    }

    const transferRequest = await createTransferRequestService(request)

    await publishTransferRequestCreated(transferRequest)

    return {
        statusCode: 201,
        body: JSON.stringify({
            trId: transferRequest.trId,
            status: transferRequest.status,
            message: transferRequest.message
        })
    }
}