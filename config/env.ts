
import 'dotenv/config'

export const checkENV = (
    value: string | undefined
) => {
    if(!value){
        throw new Error('Environment variable is missing')
    }

    return value
}