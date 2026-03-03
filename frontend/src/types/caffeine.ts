export interface CaffeineIntake {
  id: number
  intake_datetime: Date
  amount_mg: number
  created_at: Date
  updated_at: Date
}

export interface IntakeCreate {
  intake_datetime: Date
  amount_mg: number
}

export const GRID_HOURS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] as const
export const HOUR_LABELS = ['5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p'] as const

export interface GridCell {
  date: string     // YYYY-MM-DD
  hour: number     // 5-17
  totalMg: number
}
