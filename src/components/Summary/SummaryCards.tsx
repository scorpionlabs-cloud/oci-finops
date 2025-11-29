import './SummaryCards.css'

interface SummaryCardsProps {
  totalCost: number
  totalUsage: number
  recordsCount: number
}

export function SummaryCards({ totalCost, totalUsage, recordsCount }: SummaryCardsProps) {
  return (
    <div className="summary-root">
      <div className="summary-card">
        <div className="summary-label">Total Cost</div>
        <div className="summary-value">
          ${totalCost.toFixed(2)}
          <span className="summary-unit"> (mock / CSV)</span>
        </div>
        <div className="summary-footnote">Sum of filtered records</div>
      </div>

      <div className="summary-card">
        <div className="summary-label">Total Usage</div>
        <div className="summary-value">
          {totalUsage.toFixed(2)}
          <span className="summary-unit"> (mixed units)</span>
        </div>
        <div className="summary-footnote">Raw usageAmount across rows</div>
      </div>

      <div className="summary-card">
        <div className="summary-label">Records</div>
        <div className="summary-value">{recordsCount}</div>
        <div className="summary-footnote">After filters</div>
      </div>
    </div>
  )
}
