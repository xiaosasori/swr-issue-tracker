<script setup>
import { toRefs, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import IssueItem from './IssueItem.vue'
import { useDebouncedRef } from '@/composables/useDebouncedRef'

const props = defineProps({
  labels: Array,
  status: String,
})
const { labels, status } = toRefs(props)
const { isLoading, data } = useQuery(
  ['issues', { labels, status }],
  () => {
    const labelsString = labels.value
      .map((label) => `labels[]=${label}`)
      .join('&')
    const statusString = status.value ? `&status=${status.value}` : ''
    return fetch(`/api/issues?${labelsString}${statusString}`).then((res) =>
      res.json()
    )
  },
  {
    staleTime: 1000 * 60,
  }
)

const search = useDebouncedRef('')
const {
  data: searchResult,
  fetchStatus: fetchSearchStatus,
  isLoading: isSearchLoading,
} = useQuery(
  ['issues', 'search', search],
  () => fetch(`/api/search/issues?q=${search.value}`).then((res) => res.json()),
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
    <h2>Issues List</h2>
    <p v-if="isLoading">Loading...</p>
    <ul
      v-else-if="fetchSearchStatus === 'idle' && isSearchLoading"
      class="issues-list"
    >
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
