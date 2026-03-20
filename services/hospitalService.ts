
import { getNearestHospital, createTransferRequest, getConfirmationMessage } from '../repositories/hospitalRepository'
import { SeverityLevel } from '../types/query'
import { hospitalDTO } from '../lib/hospitalDTO'
import { TransferRequest } from '../types/transferrequest'
import { transferRequestDTO } from '../lib/transferRequestDTO'
import { AppError } from '../types/error'
import { transferRequestDetailDTO } from '../lib/transferRequestDetailDTO'

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

export const getConfirmationMessageService = async (
    id: number,
    serviceName: string
)=> {
    const row = await getConfirmationMessage(id)

    if(serviceName.toLowerCase() !== row.requestedBy.toLowerCase()){
        throw new AppError(400, 'Wrong Service Name')
    }

    const transferRequestDetail = transferRequestDetailDTO(row)

    return transferRequestDetail
}