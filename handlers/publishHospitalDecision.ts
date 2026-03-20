
import { SQSEvent, SQSBatchResponse } from 'aws-lambda'
import { isHospitalDecisionMessage } from '../lib/validateHospitalDecisionMessage'
import { db } from '../config/db'
import { ResultSetHeader } from 'mysql2'
import { publishHospitalDecision } from '../events/hospitalDecision'

export const handler = async(
    event: SQSEvent
): Promise<SQSBatchResponse> => {

    const batchItemFailures: { itemIdentifier: string }[] = []

    for(const record of event.Records){
        try{
            const data = JSON.parse(record.body)

            const message: unknown = JSON.parse(data.Message)

            if(!isHospitalDecisionMessage(message)){
                throw new Error('Invalid Message')
            }

            const sql = `UPDATE TransferRequest
                         SET status = ?, respondedAt = ?, hospital_message = ?
                         WHERE tr_id = ?`

            await db.query<ResultSetHeader>(sql, [
                message.status,
                message.respondedAt,
                message.message,
                message.trId
            ])

            await publishHospitalDecision(message)

        }catch(error){
            console.log({
                messageId: record.messageId,
                messageBody: JSON.parse(record.body),
                error: error instanceof Error && error.message
            })

            batchItemFailures.push({
                itemIdentifier: record.messageId
            })
        }
    }

    return { batchItemFailures }

}