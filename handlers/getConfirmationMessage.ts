
import { getConfirmationMessageService } from '../services/hospitalService'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { AppError } from '../types/error'

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    try {
        
        const id = event.pathParameters?.id ? Number(event.pathParameters.id) : undefined
        const serviceName =  event.queryStringParameters?.service ? event.queryStringParameters.service : undefined

        if((!id || isNaN(id)) || !serviceName){
            throw new AppError(400, 'Bad Request')
        }

        const transferRequestDetail = await getConfirmationMessageService(id, serviceName)

        return {
            statusCode: 200,
            body: JSON.stringify(transferRequestDetail)
        }
    } catch (err) {

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
                    message: err instanceof Error ? err.message : 'Something Went Wrong'
                })
            }
        }
    }
}