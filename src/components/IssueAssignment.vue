<script setup>
import { ref, toRef } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useUserData } from '@/composables/useUserData'

const props = defineProps({
  assignee: String,
  issueNumber: String,
})
const assignee = toRef(props, 'assignee')

const { data: assigneeData, isSuccess: isAssigneeQuerySuccess } =
  useUserData(assignee)
const menuOpen = ref(false)
const { data: usersQueryData, isLoading: isUsersQueryLoading } = useQuery(
  ['users'],
  () => fetch('/api/users').then((res) => res.json())
)
const queryClient = useQueryClient()

const { mutate } = useMutation(
  (assignee) => {
    fetch(`/api/issues/${props.issueNumber}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ assignee }),
    }).then((res) => res.json())
  },
  {
    onMutate: (assignee) => {
      const oldAssignee = queryClient.getQueryData([
        'issues',
        props.issueNumber,
      ]).assignee
      queryClient.setQueryData(['issues', props.issueNumber], (data) => ({
        ...data,
        assignee,
      }))

      return function rollback() {
        queryClient.setQueryData(['issues', props.issueNumber], (data) => ({
          ...data,
          assignee: oldAssignee,
        }))
      }
    },
    onError: (error, variables, rollback) => {
      rollback()
    },
    onSettled: () => {
      queryClient.invalidateQueries(['issues', props.issueNumber], {
        exact: true,
      })
    },
  }
)

function toggleMenu() {
  if (isUsersQueryLoading.value) return
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <div class="issue-options">
    <div>
      <span>Assignment</span>
      <div v-if="isAssigneeQuerySuccess">
        <img :src="assigneeData.profilePictureUrl" />
        {{ assigneeData.name }}
      </div>
    </div>
    <Icon icon="ep:setting" @click="toggleMenu" />
    <div v-if="menuOpen" class="picker-menu">
      <div
        v-for="user in usersQueryData"
        :key="user.id"
        @click="mutate(user.id)"
      >
        <img :src="user.profilePictureUrl" />
        {{ user.name }}
      </div>
    </div>
  </div>
</template>
