import { computed, unref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

export function useUserData(userId) {
  return useQuery(
    ['users', userId],
    ({ signal }) =>
      fetch(`/api/users/${unref(userId)}`, { signal }).then((res) =>
        res.json()
      ),
    { staleTime: 1000 * 60 * 5, enabled: computed(() => !!userId.value) }
  )
}
