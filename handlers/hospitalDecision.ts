
import { SQSEvent, SQSBatchResponse } from 'aws-lambda'
import { publishHospitalUpdateStatus } from '../events/hospitalUpdateStatus'

export const hospitalDecision = async (
    event: SQSEvent
): Promise<SQSBatchResponse> => {

    const batchItemFailures = [];

    for (const record of event.Records) {
        try {
            const snsEnvelope = JSON.parse(record.body);

            const message = JSON.parse(snsEnvelope.Message);

            let messages: any = {}

            if(message?.conscious){
                messages.conscious = message.conscious
            }

            if(message?.bloodPressure){
                messages.bloodPressure = message.bloodPressure
            }

            if(message?.heartRate){
                messages.heartRate = message.heartRate
            }

            messages.transferRequestId = message.transferRequestId
            messages.hospitalId = message.hospitalId
            messages.severityLevel = message.severityLevel
            messages.injuryDescription = message.injuryDescription
            messages.status = message.status

            await publishHospitalUpdateStatus(messages)

        } catch (error) {
            console.error("Failed processing message:", error);

            batchItemFailures.push({
                itemIdentifier: record.messageId
            });
        }
    }

    return { batchItemFailures }
}