
import { snsClient } from '../config/sns'
import { PublishCommand } from '@aws-sdk/client-sns'
import { checkENV } from '../config/env'
import { TransferRequestDTO } from '../types/transferrequest'
import { TransferRequestMessage } from '../types/message' 

export const publishTransferRequestCreated = async (
    data: TransferRequestDTO
) => {

    const message: TransferRequestMessage = {
        trId: data.trId,
        hospitalId: data.hospitalId,
        severityLevel: data.severityLevel,
        injuryDescription: data.injuryDescription,
        status: data.status,
        ...(data.conscious
            ?
            {
                conscious: data.conscious
            } 
            :
            {}
        ),
        ...(data.bloodPressure
            ?
            {
                bloodPressure: data.bloodPressure
            }
            :
            {}
        ),
        ...(data.heartRate
            ?
            {
                heartRate: data.heartRate
            }
            :
            {}
        ),
        requestedAt: data.requestedAt
    }

    const response = await snsClient.send(
        new PublishCommand({
            Message: JSON.stringify(message),
            MessageAttributes: {
                id: {
                    DataType: 'String',
                    StringValue: message.hospitalId
                }
            },
            TopicArn: checkENV(process.env.SNS_HEALTHCARE)
        })
    )

    console.log(response)

    return response

}