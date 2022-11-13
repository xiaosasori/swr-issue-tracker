<script setup>
import { toRef } from 'vue'
import { possibleStatus } from '../helpers/defaultData'
import { relativeDate } from '../helpers/relativeDate'
import { useUserData } from '@/composables/useUserData'

const props = defineProps({
  title: String,
  number: Number,
  status: {
    type: String,
    default: 'todo',
  },
  createdBy: String,
  createdDate: String,
  comments: Array,
})

const statusObject = possibleStatus.find(
  (pstatus) => pstatus.id === props.status
)
const createdBy = toRef(props, 'createdBy')
const { isLoading, data } = useUserData(createdBy)
</script>
<template>
  <header>
    <h2>
      {{ title }} <span>#{{ number }}</span>
    </h2>
    <div>
      <span
        :class="[
          status === 'done' || status === 'cancelled' ? 'closed' : 'open',
        ]"
      >
        <Icon
          v-if="status === 'done' || status === 'cancelled'"
          icon="octicon:issue-closed-16"
        />
        <Icon v-else icon="octicon:issue-opened-16" />
        {{ statusObject.label }}
      </span>
      <span class="created-by"> {{ isLoading ? '...' : data?.name }} </span>
      opened this issue {{ relativeDate(createdDate) }} ·
      {{ comments.length }} comments
    </div>
  </header>
</template>
