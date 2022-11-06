<script setup>
import { relativeDate } from '../helpers/relativeDate'
defineProps({
  title: String,
  number: Number,
  assignee: String,
  commentCount: Number,
  createdBy: String,
  createdDate: String,
  labels: Array,
  status: String,
})
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
        #{{ number }} opened {{ relativeDate(createdDate) }} by {{ createdBy }}
      </small>
    </div>
    <div v-if="assignee">{{ assignee }}</div>
    <span class="comment-count">
      <template v-if="commentCount > 0">
        <Icon icon="codicon:comment" />
        {{ commentCount }}
      </template>
    </span>
  </li>
</template>
