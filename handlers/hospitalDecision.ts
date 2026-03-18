
import { SQSEvent, SQSBatchResponse } from 'aws-lambda'
import { publishHospitalUpdateStatus } from '../events/hospitalUpdateStatus'
import { isTransferRequestMessage } from '../lib/validateTransferRequestMessage'

export const handler = async (
    event: SQSEvent
): Promise<SQSBatchResponse> => {

    const batchItemFailures: { itemIdentifier: string }[] = [];

    for (const record of event.Records) {
        try {
            const data = JSON.parse(record.body);

            const message: unknown = JSON.parse(data.Message);

            if(!isTransferRequestMessage(message)){
                throw new Error('Invalid Message')
            }

            await publishHospitalUpdateStatus(message)

        } catch (error) {

            console.log({
                messageId: record.messageId,
                messageBody: JSON.parse(record.body),
                error: error instanceof Error && error.message
            })

            batchItemFailures.push({
                itemIdentifier: record.messageId
            });
        }
    }

    return { batchItemFailures }
}