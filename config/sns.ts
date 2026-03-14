
import { SNSClient } from '@aws-sdk/client-sns'
import { checkENV } from '../config/env'

export const snsClient = new SNSClient({
    region: checkENV(process.env.SNS_REGION)
})