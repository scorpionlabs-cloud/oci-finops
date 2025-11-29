import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import type { UsageRecord } from '../../types'
import './Charts.css'

interface CostOverTimeChartProps {
  records: UsageRecord[]
}

export function CostOverTimeChart({ records }: CostOverTimeChartProps) {
  const byDate = new Map<string, number>()
  records.forEach((r) => {
    byDate.set(r.date, (byDate.get(r.date) || 0) + r.cost)
  })

  const data = Array.from(byDate.entries())
    .map(([date, cost]) => ({ date, cost: Number(cost.toFixed(2)) }))
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="chart-card">
      <div className="chart-title">Cost Over Time</div>
      <div className="chart-inner">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="cost" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
