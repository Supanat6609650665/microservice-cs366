
import { getNearestHospitalService } from '../services/hospitalService'

export const getHospital = async (event: any) => {

    const { lat, lon, severitylevel } = event.queryStringParameters

    const hospitals = await getNearestHospitalService(lat, lon, severitylevel)

    return {
        statusCode: 200,
        body: JSON.stringify(hospitals)
    }
}