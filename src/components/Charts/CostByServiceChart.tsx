import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts'
import type { UsageRecord } from '../../types'
import './Charts.css'

interface CostByServiceChartProps {
  records: UsageRecord[]
}

export function CostByServiceChart({ records }: CostByServiceChartProps) {
  const dataMap = new Map<string, number>()
  records.forEach((r) => {
    dataMap.set(String(r.service), (dataMap.get(String(r.service)) || 0) + r.cost)
  })
  const data = Array.from(dataMap.entries()).map(([service, cost]) => ({
    service,
    cost: Number(cost.toFixed(2))
  }))

  return (
    <div className="chart-card">
      <div className="chart-title">Cost by OCI Service</div>
      <div className="chart-inner">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <XAxis dataKey="service" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
