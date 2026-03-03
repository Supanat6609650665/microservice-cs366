
import { snsClient } from '../config/sns'
import { PublishCommand } from '@aws-sdk/client-sns'

export const publishHospitalUpdateStatus = async(
    messages: any
)=> {
    const response = await snsClient.send(
        new PublishCommand({
            Message: JSON.stringify({
                trId: messages.transferRequestId,
                status: "CONFIRMED",
                message: "Hospital has now confirmed your transfer request"
            }),
            TopicArn: ""
        })
    )

    console.log(response)

    return response
}