import { Layout } from './components/Layout/Layout'
import { FiltersBar } from './components/Filters/FiltersBar'
import { SummaryCards } from './components/Summary/SummaryCards'
import { CostByServiceChart } from './components/Charts/CostByServiceChart'
import { CostOverTimeChart } from './components/Charts/CostOverTimeChart'
import { CostByRegionChart } from './components/Charts/CostByRegionChart'
import { UsageTable } from './components/Tables/UsageTable'
import { CsvUpload } from './components/Upload/CsvUpload'
import { useFinopsData } from './hooks/useFinopsData'
import './App.css'

function App() {
  const {
    records,
    filters,
    setFilters,
    totalCost,
    totalUsage,
    uniqueServices,
    uniqueRegions,
    uniqueCompartments,
    uniqueEnvs,
    replaceRecords
  } = useFinopsData()

  return (
    <Layout>
      {/* CSV Upload */}
      <CsvUpload onRecordsParsed={replaceRecords} />

      {/* Filters */}
      <FiltersBar
        filters={filters}
        setFilters={setFilters}
        services={uniqueServices}
        regions={uniqueRegions}
        compartments={uniqueCompartments}
        envs={uniqueEnvs}
      />

      {/* Summary */}
      <SummaryCards
        totalCost={totalCost}
        totalUsage={totalUsage}
        recordsCount={records.length}
      />

      {/* Charts */}
      <div className="app-charts-grid">
        <CostByServiceChart records={records} />
        <CostOverTimeChart records={records} />
        <CostByRegionChart records={records} />
      </div>

      {/* Table */}
      <UsageTable records={records} />
    </Layout>
  )
}

export default App
