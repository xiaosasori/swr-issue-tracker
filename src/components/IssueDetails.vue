<script setup>
import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import Comment from './Comment.vue'
import IssueHeader from './IssueHeader.vue'
import IssueStatus from './IssueStatus.vue'
import IssueAssignment from './IssueAssignment.vue'
import IssueLabels from './IssueLabels.vue'
import Loader from './Loader.vue'
import InfiniteLoad from './InfiniteLoad.vue'

function useIssueData(issueNumber) {
  return useQuery(['issues', issueNumber], ({ signal }) => {
    return fetch(`/api/issues/${issueNumber}`, { signal }).then((res) =>
      res.json()
    )
  })
}

function useIssueComments(issueNumber) {
  return useInfiniteQuery(
    ['issues', issueNumber, 'comments'],
    ({ signal, pageParam = 1 }) => {
      return fetch(`/api/issues/${issueNumber}/comments?page=${pageParam}`, {
        signal,
      }).then((res) => res.json())
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return
        return pages.length + 1
      },
    }
  )
}

const route = useRoute()
const id = route.params.id
const { data: issue, isLoading: isLoadingIssue } = useIssueData(id)
const {
  data: comments,
  isLoading: isLoadingComments,
  isFetchingNextPage,
  fetchNextPage,
} = useIssueComments(id)
</script>
<template>
  <div class="issue-details">
    <p v-if="isLoadingIssue">Loading issue...</p>
    <template v-else>
      <IssueHeader v-bind="{ ...issue }" />
      <main>
        <section>
          <p v-if="isLoadingComments">Loading...</p>
          <template v-else v-for="commentPage in comments.pages">
            <Comment
              v-for="comment in commentPage"
              :key="comment.id"
              v-bind="{ ...comment }"
            />
          </template>
          <InfiniteLoad
            class="fixed bottom-20"
            @infinite-load="fetchNextPage"
          />
          <Loader v-if="isFetchingNextPage" />
        </section>
        <aside>
          <IssueStatus
            :status="issue.status"
            :issueNumber="issue.number.toString()"
          />
          <IssueAssignment
            :assignee="issue.assignee"
            :issueNumber="issue.number.toString()"
          />
          <IssueLabels
            :labels="issue.labels"
            :issueNumber="issue.number.toString()"
          />
        </aside>
      </main>
    </template>
  </div>
</template>

<style scoped></style>
