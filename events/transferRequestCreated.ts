
import { snsClient } from '../config/sns'
import { PublishCommand } from '@aws-sdk/client-sns'

export const publishTransferRequestCreated = async (
    res: any
) => {

    const response = await snsClient.send(
        new PublishCommand({
            Message: JSON.stringify({
                transferRequestId: res.trId,
                hospitalId: res.hospitalId,
                severityLevel: res.severityLevel,
                injuryDescription: res.injuryDescription,
                status: res.status,
                ...(res.conscious ? { conscious: res.conscious } : {}),
                ...(res.bloodPressure ? { bloodPressure: res.bloodPressure } : {}),
                ...(res.heartRate ? { heartRate: res.heartRate } : {})
            }),
            TopicArn: ""
        })
    )

    console.log(response)

    return response

}