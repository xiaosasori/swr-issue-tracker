<script setup>
import { toRef } from 'vue'
import { useQuery } from '@tanstack/vue-query'

const props = defineProps({
  labels: Array,
})
const labels = toRef(props, 'labels')
const { isLoading, data } = useQuery(['issues', labels], () => {
  const labelsString = props.labels
    .map((label) => `labels[]=${label}`)
    .join('&')
  return fetch(`/api/issues?${labelsString}`).then((res) => res.json())
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
