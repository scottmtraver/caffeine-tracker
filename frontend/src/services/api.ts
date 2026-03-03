import type { CaffeineIntake, IntakeCreate } from '../types/caffeine'

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

interface IntakeResponse {
  id: number
  intake_datetime: string
  amount_mg: number
  created_at: string
  updated_at: string
}

export async function listIntakes(startDate: string, endDate: string): Promise<CaffeineIntake[]> {
  const params = new URLSearchParams({ start_date: startDate, end_date: endDate })
  const res = await fetch(`${BASE_URL}/api/v1/intake/?${params}`)
  if (!res.ok) throw new Error(`Failed to fetch intakes: ${res.status}`)
  const data: IntakeResponse[] = await res.json()
  return data.map((item) => ({
    ...item,
    intake_datetime: new Date(item.intake_datetime),
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at),
  }))
}

function toLocalISOString(dt: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`
}

export async function createIntake(data: IntakeCreate): Promise<CaffeineIntake> {
  const res = await fetch(`${BASE_URL}/api/v1/intake/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intake_datetime: toLocalISOString(data.intake_datetime),
      amount_mg: data.amount_mg,
    }),
  })
  if (!res.ok) throw new Error(`Failed to create intake: ${res.status}`)
  const item: IntakeResponse = await res.json()
  return {
    ...item,
    intake_datetime: new Date(item.intake_datetime),
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at),
  }
}
