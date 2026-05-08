
import { CreateHelpRequestResponse } from './downstream'

export interface ApiResponse<T>{
    ok: boolean,
    status: number,
    data?: T
}

export type ApiCreateHelpRequest = ApiResponse<CreateHelpRequestResponse>