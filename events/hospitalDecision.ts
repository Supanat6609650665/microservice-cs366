
import { HospitalDecisionMessage } from '../types/message'
import { snsClient } from '../config/sns'
import { PublishCommand } from '@aws-sdk/client-sns'
import { checkENV } from '../config/env'

export const publishHospitalDecision = async(
    data: HospitalDecisionMessage
)=> {
    const response = await snsClient.send(
        new PublishCommand({
            Message: JSON.stringify(data),
            MessageAttributes: {
                service: {
                    DataType: 'String',
                    StringValue: data.requestedBy
                }
            },
            TopicArn: checkENV(process.env.SNS_HEALTHCARE_HOSPITALDECISION)
        })
    )

    console.log(response)

    return response
}