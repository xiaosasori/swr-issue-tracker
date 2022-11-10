import { useQuery } from '@tanstack/vue-query'
import { defaultLabels } from '@/helpers/defaultData'

export function useLabelsData() {
  return useQuery(
    ['labels'],
    ({ signal }) => fetch(`/api/labels`, { signal }).then((res) => res.json()),
    { staleTime: 1000 * 60 * 60, placeholderData: defaultLabels }
  )
}
