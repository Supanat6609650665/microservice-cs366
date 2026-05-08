
import { TransferRequestDTO } from '../types/transferrequest'
import { CreateHelpRequest, CreateHelpRequestResponse } from '../types/downstream'
import { ApiCreateHelpRequest } from '../types/api'
import { checkENV } from '../config/env'

export const createHelpRequest = async (
    transferRequest: TransferRequestDTO,
    lat: number,
    lon: number
): Promise<ApiCreateHelpRequest> => {

    const req: CreateHelpRequest = {
        incident_id: transferRequest.incidentId,
        lat,
        lon,
        request_type: 'medical',
        description: 'HealthCareService ได้รับ request จาก ' + transferRequest.requestedBy + ' ' + transferRequest.injuryDescription
    }

    const res = await fetch(`${checkENV(process.env.API_TIMELINE_HELP_REQUEST_SERVICE)}/v1/healthcare`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })

    if(!res.ok){
        return {
            ok: false,
            status: res.status
        }
    }

    const data: CreateHelpRequestResponse = await res.json()

    return {
        ok: true,
        status: res.status,
        data
    }
}