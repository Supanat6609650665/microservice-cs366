
import { getNearestHospital } from '../repositories/hospitalRepository'
import { createTransferRequest } from '../repositories/hospitalRepository'
import { SeverityLevel } from '../types/query'
import { hospitalDTO } from '../lib/hospitalDTO'
import { TransferRequest } from '../types/transferrequest'
import { transferRequestDTO } from '../lib/transferRequestDTO'

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
    data: TransferRequest
)=> {
    const row = await createTransferRequest(data)

    const transferRequest = transferRequestDTO(row)

    return transferRequest
}