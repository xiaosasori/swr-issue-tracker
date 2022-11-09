import { useQuery } from '@tanstack/vue-query'

export function useLabelsData() {
  return (
    useQuery(['labels'], () => fetch(`/api/labels`).then((res) => res.json())),
    { staleTime: 1000 * 60 * 60 }
  )
}
