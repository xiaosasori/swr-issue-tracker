<script setup>
import { relativeDate } from '../helpers/relativeDate'
import { useUserData } from '@/composables/useUserData'

const props = defineProps({
  comment: String,
  createdBy: String,
  createdDate: String,
})
console.log('props.createdBy', props.createdBy)
const { isLoading, data } = useUserData(props.createdBy)
</script>
<template>
  <div class="comment">
    <div v-if="isLoading">
      <div class="comment-header">Loading...</div>
    </div>
    <template v-else>
      <img :src="data.profilePictureUrl" alt="Commenter Avatar" />
      <div>
        <div class="comment-header">
          <span>{{ data.name }}</span> commented&nbsp;
          <span>{{ relativeDate(createdDate) }}</span>
        </div>
        <div class="comment-body">{{ comment }}</div>
      </div>
    </template>
  </div>
</template>
