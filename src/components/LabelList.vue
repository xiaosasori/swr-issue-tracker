<script setup>
import { useLabelsData } from '@/composables/useLabelsData'

defineProps({
  selected: Array,
})

const emit = defineEmits(['toggle'])
const { isLoading, data } = useLabelsData()
</script>

<template>
  <div class="labels">
    <h3>Labels</h3>
    <p v-if="isLoading">Loading...</p>
    <ul v-else>
      <li v-for="label in data" :key="label.id">
        <button
          @click="emit('toggle', label.id)"
          :class="[
            'label',
            { selected: selected.includes(label.id) },
            label.color,
          ]"
        >
          {{ label.name }}
        </button>
      </li>
    </ul>
  </div>
</template>
