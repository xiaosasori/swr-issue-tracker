<script setup>
const possibleStatus = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'todo', label: 'To-do' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
  { id: 'cancelled', label: 'Cancelled' },
]
</script>

<template>
  <select class="status-select">
    <option value="">Select a status to filter</option>
    <option
      v-for="status in possibleStatus"
      :key="status.id"
      :value="status.id"
    >
      {{ status.label }}
    </option>
  </select>
</template>
