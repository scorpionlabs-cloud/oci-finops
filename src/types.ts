export type OciService =
  | 'Compute'
  | 'Block Volume'
  | 'Object Storage'
  | 'Load Balancer'
  | 'Autonomous Database'
  | 'Network'
  | 'Logging'
  | 'Other'

export interface UsageRecord {
  id: string
  date: string
  service: OciService | string
  region: string
  compartment: string
  resourceName: string
  usageAmount: number
  usageUnit: string
  cost: number
  tags?: Record<string, string>
}
