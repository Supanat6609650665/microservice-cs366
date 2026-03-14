
import { getNearestHospitalService } from '../services/hospitalService'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { AppError } from '../types/error'
import { isSeverityLevel } from '../lib/validateSeverityLevel'

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    try {
        const lat = event.queryStringParameters?.lat ? Number(event.queryStringParameters.lat) : undefined
        const lon = event.queryStringParameters?.lon ? Number(event.queryStringParameters.lon) : undefined
        const severitylevel = event.queryStringParameters?.severitylevel ? event.queryStringParameters.severitylevel : undefined

        if(!lat || !lon || !severitylevel){
            throw new AppError(400, 'Bad Request')
        }
        
        if(!isSeverityLevel(severitylevel)){
            throw new AppError(400, 'Invalid Severity Level')
        }

        const hospitals = await getNearestHospitalService(lat, lon, severitylevel)

        return {
            statusCode: 200,
            body: JSON.stringify(hospitals)
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