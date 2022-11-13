<script setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import StatusSelect from './StatusSelect.vue'
const props = defineProps({
  status: String,
  issueNumber: String,
})
const queryClient = useQueryClient()

const { mutate } = useMutation(
  (status) => {
    return fetch(`/api/issues/${props.issueNumber}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ status }),
    }).then((res) => res.json())
  },
  {
    onMutate: (status) => {
      const oldStatus = queryClient.getQueryData([
        'issues',
        props.issueNumber,
      ]).status
      queryClient.setQueryData(['issues', props.issueNumber], (data) => ({
        ...data,
        status,
      }))

      return function rollback() {
        queryClient.setQueryData(['issues', props.issueNumber], (data) => ({
          ...data,
          status: oldStatus,
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
</script>

<template>
  <div class="issue-options">
    <div>
      <span>Status</span>
      <StatusSelect
        noEmptyOption
        :value="status"
        @change="(event) => mutate(event.target.value)"
      />
    </div>
  </div>
</template>
