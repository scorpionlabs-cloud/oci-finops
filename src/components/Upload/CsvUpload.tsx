import { useCallback, useRef, useState } from 'react'
import Papa from 'papaparse'
import './CsvUpload.css'
import type { UsageRecord } from '../../types'

interface CsvUploadProps {
  onRecordsParsed: (records: UsageRecord[]) => void
}

export function CsvUpload({ onRecordsParsed }: CsvUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = useCallback(
    (file: File) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<any>) => {
          const rows = results.data as any[]

          const parsed: UsageRecord[] = rows.map((row, idx) => ({
            id: `${file.name}-${idx}`,
            date: row['Usage Interval Start'] || row['Start Time'] || row['Date'] || '',
            service:
              row['Service'] || row['Resource Type'] || row['Product'] || 'Other',
            region: row['Region'] || 'unknown-region',
            compartment:
              row['Compartment Name'] || row['Compartment'] || 'unknown-compartment',
            resourceName:
              row['Resource Name'] || row['Description'] || row['Instance Name'] || 'Resource',
            usageAmount: Number(row['Usage Amount'] || row['Qty'] || 0),
            usageUnit: row['Usage Unit'] || row['Unit'] || '',
            cost: Number(row['Cost'] || row['Billed Amount'] || 0),
            tags: {
              env:
                row['Tag.env'] ||
                row['tag.env'] ||
                row['Environment'] ||
                row['Tag.Environment'] ||
                ''
            }
          }))

          onRecordsParsed(parsed)
        }
      })
    },
    [onRecordsParsed]
  )

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const onDragLeave = () => setDragOver(false)

  const onClickSelect = () => {
    fileInputRef.current?.click()
  }

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div
      className={`csv-upload-root ${dragOver ? 'drag-over' : ''}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={onClickSelect}
    >
      <div className="csv-upload-icon">📄</div>
      <div className="csv-upload-text">
        <strong>Upload OCI Cost CSV</strong>
        <br />
        Drag &amp; drop or click to select
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        className="csv-upload-input"
        onChange={onChangeFile}
      />
    </div>
  )
}
