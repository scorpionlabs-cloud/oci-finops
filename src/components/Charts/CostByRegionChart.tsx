import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts'
import type { UsageRecord } from '../../types'
import './Charts.css'

interface CostByRegionChartProps {
  records: UsageRecord[]
}

export function CostByRegionChart({ records }: CostByRegionChartProps) {
  const byRegion = new Map<string, number>()
  records.forEach((r) => {
    byRegion.set(r.region, (byRegion.get(r.region) || 0) + r.cost)
  })
  const data = Array.from(byRegion.entries()).map(([region, cost]) => ({
    region,
    cost: Number(cost.toFixed(2))
  }))

  return (
    <div className="chart-card">
      <div className="chart-title">Cost by Region</div>
      <div className="chart-inner">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} dataKey="cost" nameKey="region" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
