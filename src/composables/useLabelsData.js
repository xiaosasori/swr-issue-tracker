import { useQuery } from '@tanstack/vue-query'

export function useLabelsData() {
  return useQuery(['labels'], () =>
    fetch(`/api/labels`).then((res) => res.json())
  )
}
