import type { UsageRecord } from '../../types'
import './UsageTable.css'

interface UsageTableProps {
  records: UsageRecord[]
}

export function UsageTable({ records }: UsageTableProps) {
  return (
    <div className="table-card">
      <div className="table-title">Usage Records</div>
      <div className="table-wrapper">
        <table className="usage-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Service</th>
              <th>Region</th>
              <th>Compartment</th>
              <th>Resource</th>
              <th>Usage</th>
              <th>Cost ($)</th>
              <th>Env (tag)</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.service}</td>
                <td>{r.region}</td>
                <td>{r.compartment}</td>
                <td>{r.resourceName}</td>
                <td>
                  {r.usageAmount.toFixed(2)} {r.usageUnit}
                </td>
                <td>{r.cost.toFixed(2)}</td>
                <td>{r.tags?.env || r.tags?.ENV || r.tags?.Env || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {records.length === 0 && <div className="table-empty">No records match the filters.</div>}
    </div>
  )
}
