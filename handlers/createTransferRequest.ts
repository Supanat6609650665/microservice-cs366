
import { createTransferRequestService } from '../services/hospitalService'
import { publishTransferRequestCreated } from '../events/transferRequestCreated'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { AppError } from '../types/error'
import { isTransferRequest } from '../lib/validateTransferRequest'
import { createHelpRequest } from '../lib/createHelpRequest'
import { updateHelpRequest } from '../lib/updateHelpRequest'

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    try{
        if(!event.body){
            throw new AppError(400, 'Bad Request')
        }

        const data: unknown = JSON.parse(event.body)

        if(!isTransferRequest(data)){
            throw new AppError(400, 'Bad Request')
        }

        if(!data.conscious){
            data.conscious = null
        }

        if(!data.bloodPressure){
            data.bloodPressure = null
        }

        if(!data.heartRate){
            data.heartRate = null
        }

        const transferRequest = await createTransferRequestService(data)

        const res = await createHelpRequest(transferRequest, data.lat, data.lon)
        
        await publishTransferRequestCreated(transferRequest, res.data?.request_id || '')

        if(res.ok && res.data){
            await updateHelpRequest(res.data.request_id, 'sent_request_hospital', 'HealthCareService ได้ทําการส่ง TransferRequest ไปยังโรงพยาบาลเเล้ว')
        }

        return {
            statusCode: 201,
            body: JSON.stringify({
                trId: transferRequest.trId,
                status: transferRequest.status,
                message: "Waiting for hospital confirmation"
            })
        }

    } catch(err){
        if(err instanceof AppError){
            return {
                statusCode: err.statusCode,
                body: JSON.stringify({
                    statusCode: err.statusCode,
                    message: err.message
                })
            }
        }
        else{
            return {
                statusCode: 500,
                body: JSON.stringify({
                    statusCode: 500,
                    body: JSON.stringify({
                        statusCode: 500,
                        message: err instanceof Error ? err.message : "Something Went Wrong"
                    })
                })
            }
        }
    }
}