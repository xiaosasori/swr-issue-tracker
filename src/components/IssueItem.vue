<script setup>
import { relativeDate } from '../helpers/relativeDate'
import { useUserData } from '@/composables/useUserData'
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
  assigneeUser = useUserData(props.assignee)
}

const createdByUser = useUserData(props.createdBy)
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
    <div className="issue-content">
      <span>
        <router-link :to="`/issue/${number}`">{{ title }}</router-link>
        <span v-for="label in labels" :key="label" class="label red">
          {{ label }}
        </span>
      </span>
      <small>
        #{{ number }} opened {{ relativeDate(createdDate) }}
        <template v-if="createdByUser.isSuccess"
          >by {{ createdByUser.data.name }}</template
        >
      </small>
    </div>
    <img
      v-if="assignee && assigneeUser.isSuccess"
      :src="assigneeUser.data.profilePictureUrl"
      class="assigned-to"
      :alt="`Assigned to ${assigneeUser.data.name}`"
    />
    <span class="comment-count">
      <template v-if="commentCount > 0">
        <Icon icon="codicon:comment" />
        {{ commentCount }}
      </template>
    </span>
  </li>
</template>
