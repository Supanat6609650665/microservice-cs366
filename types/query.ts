
export const SEVERITYLEVEL = ['low', 'medium', 'high', 'critical'] as const
export type SeverityLevel = typeof SEVERITYLEVEL[number]