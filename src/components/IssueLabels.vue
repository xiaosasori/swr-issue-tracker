<script setup>
import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useLabelsData } from '@/composables/useLabelsData'

const props = defineProps({
  labels: Array,
  issueNumber: String,
})

const { data: labelsQueryData, isLoading: isLabelsQueryLoading } =
  useLabelsData()
const menuOpen = ref(false)

const queryClient = useQueryClient()

const { mutate } = useMutation(
  (labelId) => {
    const newLabels = props.labels.includes(labelId)
      ? props.labels.filter((currentLabel) => currentLabel !== labelId)
      : [...props.labels, labelId]

    queryClient.setQueryData(['issues', props.issueNumber], (data) => ({
      ...data,
      labels: newLabels,
    }))

    return fetch(`/api/issues/${props.issueNumber}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ labels: newLabels }),
    }).then((res) => res.json())
  },
  {
    onMutate: () => {
      const oldLabels = queryClient.getQueryData([
        'issues',
        props.issueNumber,
      ]).labels
      return function rollback() {
        queryClient.setQueryData(['issues', props.issueNumber], (data) => {
          return {
            ...data,
            labels: oldLabels,
          }
        })
      }
    },
    onError: (error, variables, rollback) => {
      rollback()
    },
    onSettled: () => {
      // queryClient.invalidateQueries(['issues', props.issueNumber], {
      //   exact: true,
      // })
    },
  }
)

function findLabel(label) {
  return labelsQueryData.value.find((queryLabel) => queryLabel.id === label)
}

function toggleMenu() {
  if (isLabelsQueryLoading.value) return
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <div class="issue-options">
    <div>
      <span>Labels</span>
      <template
        v-if="!isLabelsQueryLoading"
        v-for="label in labels"
        :key="label"
      >
        <div :set="(labelObject = findLabel(label))">
          <span v-if="labelObject" :class="['label', labelObject.color]">
            {{ labelObject.name }}
          </span>
        </div>
      </template>
    </div>
    <Icon icon="ep:setting" @click="toggleMenu" />
    <div v-if="menuOpen" class="picker-menu labels">
      <template v-for="label in labelsQueryData" :key="label.id">
        <div
          :set="(selected = labels.includes(label.id))"
          :class="{ selected }"
          @click="mutate(label.id)"
        >
          <span
            class="label-dot"
            :style="{ backgroundColor: label.color }"
          ></span>
          {{ label.name }}
        </div>
      </template>
    </div>
  </div>
</template>
