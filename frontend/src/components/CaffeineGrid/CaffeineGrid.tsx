import { useState, useMemo } from 'react'
import { format, eachDayOfInterval, subDays } from 'date-fns'
import { useIntakes } from '../../hooks/useCaffeineData'
import { GRID_HOURS, HOUR_LABELS } from '../../types/caffeine'
import CaffeineCell from './CaffeineCell'
import AddIntakeModal from '../AddIntakeModal'

const GRID_COLUMNS = '110px repeat(13, minmax(44px, 1fr)) 85px'

export default function CaffeineGrid() {
  const today = new Date()
  const startDate = subDays(today, 13)
  const startStr = format(startDate, 'yyyy-MM-dd')
  const endStr = format(today, 'yyyy-MM-dd')

  const { data: intakes } = useIntakes(startStr, endStr)
  const [selectedCell, setSelectedCell] = useState<{ date: string; hour: number } | null>(null)

  const dates = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: today }).reverse()
  }, [startStr, endStr])

  // Group intakes into Map<dateStr, Map<hour, totalMg>>
  const gridData = useMemo(() => {
    const map = new Map<string, Map<number, number>>()
    if (!intakes) return map
    for (const intake of intakes) {
      const dateKey = format(intake.intake_datetime, 'yyyy-MM-dd')
      const hour = intake.intake_datetime.getHours()
      if (hour < 5 || hour > 17) continue
      if (!map.has(dateKey)) map.set(dateKey, new Map())
      const hourMap = map.get(dateKey)!
      hourMap.set(hour, (hourMap.get(hour) ?? 0) + intake.amount_mg)
    }
    return map
  }, [intakes])

  function getAmount(dateStr: string, hour: number): number {
    return gridData.get(dateStr)?.get(hour) ?? 0
  }

  function getDailyTotal(dateStr: string): number {
    const hourMap = gridData.get(dateStr)
    if (!hourMap) return 0
    let total = 0
    for (const mg of hourMap.values()) total += mg
    return total
  }

  function getHourlyTotal(hour: number): number {
    let total = 0
    for (const d of dates) {
      total += getAmount(format(d, 'yyyy-MM-dd'), hour)
    }
    return total
  }

  const grandTotal = useMemo(() => {
    let total = 0
    for (const d of dates) {
      total += getDailyTotal(format(d, 'yyyy-MM-dd'))
    }
    return total
  }, [gridData, dates])

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 overflow-x-auto">
        {/* Hour labels row */}
        <div style={{ display: 'grid', gridTemplateColumns: GRID_COLUMNS, gap: '3px' }} className="mb-2">
          <div style={{ width: '110px' }} />
          {HOUR_LABELS.map((label) => (
            <div
              key={label}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500, color: '#9CA3AF', height: '32px' }}
            >
              {label}
            </div>
          ))}
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Daily
          </div>
        </div>

        {/* Data rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {dates.map((d, i) => {
            const dateStr = format(d, 'yyyy-MM-dd')
            const dateLabel = format(d, 'EEE MMM d')
            const dailyTotal = getDailyTotal(dateStr)
            const isRecent = i < 3

            return (
              <div key={dateStr} style={{ display: 'grid', gridTemplateColumns: GRID_COLUMNS, gap: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: 500, color: isRecent ? '#6B7280' : '#9CA3AF' }}>
                  {dateLabel}
                </div>
                {GRID_HOURS.map((hour) => (
                  <CaffeineCell
                    key={hour}
                    amount={getAmount(dateStr, hour)}
                    onClick={() => setSelectedCell({ date: dateStr, hour })}
                  />
                ))}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', borderRadius: '3px', fontSize: '12px', fontWeight: 700, color: '#111827' }}>
                  {dailyTotal}mg
                </div>
              </div>
            )
          })}
        </div>

        {/* Hourly averages row */}
        <div
          style={{ display: 'grid', gridTemplateColumns: GRID_COLUMNS, gap: '3px', borderTop: '1px solid #F3F4F6', paddingTop: '12px', marginTop: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Hourly
          </div>
          {GRID_HOURS.map((hour) => (
            <div
              key={hour}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', borderRadius: '3px', fontSize: '11px', fontWeight: 700, color: '#111827', aspectRatio: '1 / 0.8' }}
            >
              {getHourlyTotal(hour)}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECFDF5', borderRadius: '3px', fontSize: '11px', fontWeight: 700, color: '#047857', aspectRatio: '1 / 0.8' }}>
            {grandTotal}mg
          </div>
        </div>
      </div>

      {selectedCell && (
        <AddIntakeModal
          isOpen={true}
          onClose={() => setSelectedCell(null)}
          date={selectedCell.date}
          hour={selectedCell.hour}
        />
      )}
    </div>
  )
}
