
export interface CreateHelpRequest{
    incident_id: string,
    lat: number,
    lon: number,
    request_type: string,
    description: string
}

export interface CreateHelpRequestResponse{
    request_id: string
    current_status: string,
    created_at: string
}