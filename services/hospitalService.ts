
import { getNearestHospital } from '../repositories/hospitalRepository'
import { createTransferRequest } from '../repositories/hospitalRepository'
import { SeverityLevel } from '../types/query'
import { hospitalDTO } from '../lib/hospitalDTO'

export const getNearestHospitalService = async (
    lat: number,
    lon: number,
    severitylevel: SeverityLevel
) => {
    const rows = await getNearestHospital(lat, lon, severitylevel)

    const hospitals = hospitalDTO(rows)

    return hospitals
}

export const createTransferRequestService = async (
    request: any
)=> {
    const transferRequest = await createTransferRequest(request)

    return transferRequest
}