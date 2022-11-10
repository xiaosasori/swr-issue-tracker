<script setup>
import { toRefs, computed } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import IssueItem from './IssueItem.vue'
import Loader from './Loader.vue'
import { useDebouncedRef } from '@/composables/useDebouncedRef'
import fetchWithError from '../helpers/fetchWithError'

const props = defineProps({
  labels: Array,
  status: String,
})
const { labels, status } = toRefs(props)
const queryClient = useQueryClient()
const {
  isLoading: isIssuesQueryLoading,
  data: issues,
  isError: isIssuesQueryError,
  error: issuesQueryError,
  fetchStatus: fetchIssuesQueryStatus,
} = useQuery(['issues', { labels, status }], async ({ signal }) => {
  const labelsString = labels.value
    .map((label) => `labels[]=${label}`)
    .join('&')
  const statusString = status.value ? `&status=${status.value}` : ''
  const results = await fetchWithError(
    `/api/issues?${labelsString}${statusString}`,
    {
      // headers: { 'x-error': true },
      signal,
    }
  )

  results.forEach((issue) => {
    queryClient.setQueryData(['issues', issue.number.toString()], issue)
  })

  return results
})

const search = useDebouncedRef('')
const {
  data: searchResult,
  fetchStatus: fetchSearchStatus,
  isLoading: isSearchLoading,
} = useQuery(
  ['issues', 'search', search],
  ({ signal }) =>
    fetch(`/api/search/issues?q=${search.value}`, { signal }).then((res) =>
      res.json()
    ),
  {
    enabled: computed(() => search.value.length > 0),
  }
)
</script>

<template>
  <div>
    <form>
      <label for="search">Search Issues</label>
      <input
        type="search"
        placeholder="Search"
        name="search"
        id="search"
        v-model="search"
      />
    </form>
    <h2>Issues List <Loader v-if="fetchIssuesQueryStatus === 'fetching'" /></h2>
    <p v-if="isIssuesQueryLoading">Loading...</p>
    <p v-if="isIssuesQueryError">{{ issuesQueryError.message }}</p>
    <ul
      v-else-if="fetchSearchStatus === 'idle' && isSearchLoading"
      class="issues-list"
    >
      <IssueItem
        v-for="issue in issues"
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
    <template v-else>
      <h2>Search Results</h2>
      <p v-if="isSearchLoading">Loading...</p>
      <template v-else>
        <p>{{ searchResult.count }} Results</p>
        <ul class="issues-list">
          <IssueItem
            v-for="issue in searchResult.items"
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
      </template>
    </template>
  </div>
</template>
