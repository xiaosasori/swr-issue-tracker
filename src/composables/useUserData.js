import { useQuery } from '@tanstack/vue-query'

export function useUserData(userId) {
  return useQuery(['users', userId], () =>
    fetch(`/api/users/${userId}`).then((res) => res.json())
  )
}
