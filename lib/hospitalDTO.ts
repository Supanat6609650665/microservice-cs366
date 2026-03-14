
import { HospitalDB, HospitalDTO } from '../types/hospital'

export const hospitalDTO = (
    rows: HospitalDB[]
): HospitalDTO[] => {
    const hospitals = rows.map((item)=>{
        return {
            hospitalId: item.hospital_id,
            name: item.name,
            status: item.status,
            lat: item.lat,
            lon: item.lon,
            address: item.address,
            availableBeds: item.available_beds,
            availableICU: item.available_icu,
            availableEmergencyBed: item.available_emergencybed
        }
    })

    return hospitals
}