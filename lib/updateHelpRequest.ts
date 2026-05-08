
import { checkENV } from '../config/env'

export const updateHelpRequest = async(
    requestId: string,
    status: string,
    note: string
)=>{
    const res = await fetch(`${checkENV(process.env.API_TIMELINE_HELP_REQUEST_SERVICE)}/v1/help-requests/${requestId}/status`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            new_status: status,
            note
        })
    })

    if(res.ok){
        console.log({
            ok: true,
            status: res.status
        })
    }
    else{
        console.log({
            ok: false,
            status: res.status
        })
    }
}