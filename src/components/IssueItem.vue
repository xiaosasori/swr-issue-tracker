<script setup>
import { relativeDate } from '../helpers/relativeDate'
import { useUserData } from '@/composables/useUserData'
import Label from './Label.vue'
const props = defineProps({
  title: String,
  number: Number,
  assignee: String,
  commentCount: Number,
  createdBy: String,
  createdDate: String,
  labels: Array,
  status: String,
})

let assigneeUser
if (props.assignee) {
  const { data } = useUserData(props.assignee)
  assigneeUser = data
}

const { data: createdByUser } = useUserData(props.createdBy)
</script>

<template>
  <li>
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
