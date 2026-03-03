import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listIntakes, createIntake } from '../services/api'
import type { IntakeCreate } from '../types/caffeine'

export function useIntakes(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ['intakes', startDate, endDate],
    queryFn: () => listIntakes(startDate, endDate),
  })
}

export function useCreateIntake() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IntakeCreate) => createIntake(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['intakes'] })
    },
  })
}
