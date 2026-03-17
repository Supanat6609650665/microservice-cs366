
import { SEVERITYLEVEL, SeverityLevel } from '../types/query'

export const isSeverityLevel = (
    severitylevel: string
): severitylevel is SeverityLevel => {
    return SEVERITYLEVEL.includes(severitylevel.toUpperCase() as SeverityLevel)
}