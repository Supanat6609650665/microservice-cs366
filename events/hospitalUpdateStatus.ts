
import { snsClient } from '../config/sns'
import { PublishCommand } from '@aws-sdk/client-sns'
import { TransferRequestMessage, HospitalDecisionMessage } from '../types/message'
import { checkENV } from '../config/env'

export const publishHospitalUpdateStatus = async(
    data: TransferRequestMessage
)=> {
    const message: HospitalDecisionMessage = {
        trId: data.trId,
        status: "CONFIRMED",
        message: "Hospital has now confirmed your transfer request",
        requestedAt: data.requestedAt,
        respondedAt: new Date().toISOString(),
        requestedBy: data.requestedBy
    }

    const response = await snsClient.send(
        new PublishCommand({
            Message: JSON.stringify(message),
            TopicArn: checkENV(process.env.SNS_HOSPITAL)
        })
    )

    console.log(response)

    return response
}