import { useEffect, useMemo, useState } from 'react'
import rawData from '../data/mockUsageData.json'
import type { UsageRecord, OciService } from '../types'
import { parseISO, isWithinInterval } from 'date-fns'

export interface FiltersState {
  service: OciService | 'All'
  region: string | 'All'
  compartment: string | 'All'
  envTag: string | 'All'
  dateFrom?: string
  dateTo?: string
}

export function useFinopsData() {
  const [filters, setFilters] = useState<FiltersState>({
    service: 'All',
    region: 'All',
    compartment: 'All',
    envTag: 'All'
  })

  const [records, setRecords] = useState<UsageRecord[]>([])

  useEffect(() => {
    // Default: mock data. You can replace this with fetch() from OCI Object Storage.
    setRecords(rawData as UsageRecord[])
  }, [])

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (filters.service !== 'All' && r.service !== filters.service) return false
      if (filters.region !== 'All' && r.region !== filters.region) return false
      if (filters.compartment !== 'All' && r.compartment !== filters.compartment) return false

      if (filters.envTag !== 'All') {
        const envTag = r.tags?.env || r.tags?.ENV || r.tags?.Env
        if (envTag !== filters.envTag) return false
      }

      if (filters.dateFrom || filters.dateTo) {
        const date = parseISO(r.date)
        const from = filters.dateFrom ? parseISO(filters.dateFrom) : undefined
        const to = filters.dateTo ? parseISO(filters.dateTo) : undefined

        if (from && to) {
          if (!isWithinInterval(date, { start: from, end: to })) return false
        } else if (from && date < from) {
          return false
        } else if (to && date > to) {
          return false
        }
      }

      return true
    })
  }, [records, filters])

  const totalCost = useMemo(
    () => filteredRecords.reduce((sum, r) => sum + r.cost, 0),
    [filteredRecords]
  )

  const totalUsage = useMemo(
    () => filteredRecords.reduce((sum, r) => sum + r.usageAmount, 0),
    [filteredRecords]
  )

  const uniqueServices = useMemo(
    () => Array.from(new Set(records.map((r) => r.service))).sort(),
    [records]
  )

  const uniqueRegions = useMemo(
    () => Array.from(new Set(records.map((r) => r.region))).sort(),
    [records]
  )

  const uniqueCompartments = useMemo(
    () => Array.from(new Set(records.map((r) => r.compartment))).sort(),
    [records]
  )

  const uniqueEnvs = useMemo(() => {
    const envs = new Set<string>()
    records.forEach((r) => {
      const env = r.tags?.env || r.tags?.ENV || r.tags?.Env
      if (env) envs.add(env)
    })
    return Array.from(envs).sort()
  }, [records])

  const replaceRecords = (newRecords: UsageRecord[]) => {
    setRecords(newRecords)
    // When new CSV is loaded, reset filters
    setFilters({
      service: 'All',
      region: 'All',
      compartment: 'All',
      envTag: 'All',
      dateFrom: undefined,
      dateTo: undefined
    })
  }

  return {
    records: filteredRecords,
    filters,
    setFilters,
    totalCost,
    totalUsage,
    uniqueServices,
    uniqueRegions,
    uniqueCompartments,
    uniqueEnvs,
    replaceRecords
  }
}
