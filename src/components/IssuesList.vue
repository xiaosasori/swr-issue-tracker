<script setup>
import { useQuery } from '@tanstack/vue-query'

const { isLoading, data } = useQuery({
  queryKey: ['issues'],
  queryFn: () => fetch('/api/issues').then((res) => res.json()),
})
</script>

<template>
  <div>
    <h2>Issues List</h2>
    <p v-if="isLoading">Loading...</p>
    <ul v-else className="issues-list">
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
