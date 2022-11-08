<script setup>
import { computed } from 'vue'
import { useLabelsData } from '@/composables/useLabelsData'
const props = defineProps({
  label: String,
})

const { data } = useLabelsData()
const labelObj = computed(() => {
  return data.value?.find((queryLabel) => queryLabel.id === props.label)
})
</script>

<template>
  <span v-if="labelObj" :class="['label', `${labelObj.color}`]">{{
    labelObj.name
  }}</span>
</template>
