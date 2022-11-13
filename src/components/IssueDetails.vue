<script setup>
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import Comment from './Comment.vue'
import IssueHeader from './IssueHeader.vue'
import IssueStatus from './IssueStatus.vue'
import IssueAssignment from './IssueAssignment.vue'

function useIssueData(issueNumber) {
  return useQuery(['issues', issueNumber], ({ signal }) => {
    return fetch(`/api/issues/${issueNumber}`, { signal }).then((res) =>
      res.json()
    )
  })
}

function useIssueComments(issueNumber) {
  return useQuery(['issues', issueNumber, 'comments'], ({ signal }) => {
    return fetch(`/api/issues/${issueNumber}/comments`, { signal }).then(
      (res) => res.json()
    )
  })
}

const route = useRoute()
const id = route.params.id
const { data: issue, isLoading: isLoadingIssue } = useIssueData(id)
const { data: comments, isLoading: isLoadingComments } = useIssueComments(id)
</script>
<template>
  <div class="issue-details">
    <p v-if="isLoadingIssue">Loading issue...</p>
    <template v-else>
      <IssueHeader v-bind="{ ...issue }" />
      <main>
        <section>
          <p v-if="isLoadingComments">Loading...</p>
          <Comment
            v-else
            v-for="comment in comments"
            :key="comment.id"
            v-bind="{ ...comment }"
          />
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
        </aside>
      </main>
    </template>
  </div>
</template>

<style scoped></style>
