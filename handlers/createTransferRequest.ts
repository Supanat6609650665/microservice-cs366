
import { createTransferRequestService } from '../services/hospitalService'
import { publishTransferRequestCreated } from '../events/transferRequestCreated'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { AppError } from '../types/error'
import { isTransferRequest } from '../lib/validateTransferRequest'

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
        
        await publishTransferRequestCreated(transferRequest)

        return {
            statusCode: 201,
            body: JSON.stringify(transferRequest)
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