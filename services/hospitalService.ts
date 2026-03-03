
import { getNearestHospital } from '../repositories/hospitalRepository'
import { createTransferRequest } from '../repositories/hospitalRepository'

export const getNearestHospitalService = async (
    lat: string,
    lon: string,
    severitylevel: string
) => {
    const hospitals = await getNearestHospital(lat, lon, severitylevel)

    return hospitals
}

export const createTransferRequestService = async (
    request: any
)=> {
    const transferRequest = await createTransferRequest(request)

    return transferRequest
}