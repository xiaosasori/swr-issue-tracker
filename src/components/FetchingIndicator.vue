<script setup>
import { useIsFetching } from '@tanstack/vue-query'
import Loader from './Loader.vue'

const isFetching = useIsFetching()
</script>

<template>
  <div v-if="isFetching" class="fetching-indicator">
    <Loader />
  </div>
</template>
