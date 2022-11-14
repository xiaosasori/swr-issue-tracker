<script setup>
import { toRefs } from 'vue'
import { relativeDate } from '../helpers/relativeDate'
import { useUserData } from '@/composables/useUserData'
import Label from './Label.vue'
import { useQueryClient } from '@tanstack/vue-query'
import fetchWithError from '../helpers/fetchWithError'
const props = defineProps({
  title: String,
  number: String,
  assignee: String,
  commentCount: Number,
  createdBy: String,
  createdDate: String,
  labels: Array,
  status: String,
})

let assigneeUser
const { createdBy, number, assignee } = toRefs(props)
if (props.assignee) {
  const { data } = useUserData(assignee)
  assigneeUser = data
}

const { data: createdByUser } = useUserData(createdBy)
const queryClient = useQueryClient()

function prefetch() {
  queryClient.prefetchQuery(['issues', number], () =>
    fetchWithError(`/api/issues/${props.number}`)
  )
  queryClient.prefetchInfiniteQuery(['issues', number, 'comments'], () =>
    fetchWithError(`/api/issues/${number.value}/comments?page=1`)
  )
}
</script>

<template>
  <li @mouseenter="prefetch">
    <div>
      <Icon
        v-if="status === 'done' || status === 'cancelled'"
        icon="octicon:issue-closed-16"
        color="red"
      />
      <Icon v-else icon="octicon:issue-opened-16" color="green" />
    </div>
    <div class="issue-content">
      <span>
        <router-link :to="`/issue/${number}`">{{ title }}</router-link>
        <Label v-for="label in labels" :key="label" :label="label" />
      </span>
      <small>
        #{{ number }} opened {{ relativeDate(createdDate) }}
        <template v-if="createdByUser"> by {{ createdByUser.name }} </template>
      </small>
    </div>
    <img
      v-if="assignee && assigneeUser"
      :src="assigneeUser.profilePictureUrl"
      class="assigned-to"
      :alt="`Assigned to ${assigneeUser.name}`"
    />
    <span class="comment-count">
      <template v-if="commentCount > 0">
        <Icon icon="codicon:comment" />
        {{ commentCount }}
      </template>
    </span>
  </li>
</template>
