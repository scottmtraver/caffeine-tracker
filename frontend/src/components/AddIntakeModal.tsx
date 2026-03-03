import { useState, useEffect, useCallback, type FormEvent } from 'react'
import { useCreateIntake } from '../hooks/useCaffeineData'

interface AddIntakeModalProps {
  isOpen: boolean
  onClose: () => void
  date: string
  hour: number
}

export default function AddIntakeModal({ isOpen, onClose, date, hour }: AddIntakeModalProps) {
  const [time, setTime] = useState(`${String(hour).padStart(2, '0')}:00`)
  const [amountMg, setAmountMg] = useState('')
  const createIntake = useCreateIntake()

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const [hours, minutes] = time.split(':').map(Number)
    const dt = new Date(`${date}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`)
    createIntake.mutate(
      { intake_datetime: dt, amount_mg: Number(amountMg) },
      { onSuccess: handleClose },
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full mx-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Caffeine Intake</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (mg)</label>
            <input
              type="number"
              min="1"
              required
              autoFocus
              value={amountMg}
              onChange={(e) => setAmountMg(e.target.value)}
              placeholder="e.g. 95"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createIntake.isPending}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {createIntake.isPending ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
