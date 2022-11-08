<script setup>
import { toRefs } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import IssueItem from './IssueItem.vue'

const props = defineProps({
  labels: Array,
  status: String,
})
const { labels, status } = toRefs(props)
const { isLoading, data } = useQuery(['issues', { labels, status }], () => {
  const labelsString = labels.value
    .map((label) => `labels[]=${label}`)
    .join('&')
  const statusString = status.value ? `&status=${status.value}` : ''
  return fetch(`/api/issues?${labelsString}${statusString}`).then((res) =>
    res.json()
  )
})
</script>

<template>
  <div>
    <h2>Issues List</h2>
    <p v-if="isLoading">Loading...</p>
    <ul v-else class="issues-list">
      <IssueItem
        v-for="issue in data"
        :key="issue.id"
        :title="issue.title"
        :number="issue.number"
        :assignee="issue.assignee"
        :commentCount="issue.comments.length"
        :createdBy="issue.createdBy"
        :createdDate="issue.createdDate"
        :labels="issue.labels"
        :status="issue.status"
      />
    </ul>
  </div>
</template>
