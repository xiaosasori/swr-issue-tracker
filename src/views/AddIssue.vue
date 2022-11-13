<script setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

const queryClient = useQueryClient()
const router = useRouter()
const { isLoading, mutate } = useMutation(
  (issueBody) =>
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(issueBody),
    }).then((res) => res.json()),
  {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['issues'], { exact: true })
      queryClient.setQueryData(['issues', data.number.toString()], data)
      router.push(`/issue/${data.number}`)
    },
  }
)

function submit(event) {
  if (isLoading.value) return
  mutate({
    comment: event.target.comment.value,
    title: event.target.title.value,
  })
}
</script>

<template>
  <div class="add-issue">
    <h2>Add Issue</h2>
    <form @submit.prevent="submit">
      <label for="title">Title</label>
      <input type="text" id="title" placeholder="Title" name="title" />
      <label for="comment">Comment</label>
      <textarea placeholder="Comment" id="comment" name="comment" />
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Adding Issue...' : 'Add Issue' }}
      </button>
    </form>
  </div>
</template>
