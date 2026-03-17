
export const SEVERITYLEVEL = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const
export type SeverityLevel = typeof SEVERITYLEVEL[number]