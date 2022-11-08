<script setup>
import { ref } from 'vue'

const labels = ref([])

function toggle(id) {
  console.log('toggle', id)
  if (labels.value.includes(id)) {
    labels.value = labels.value.filter((label) => label !== id)
  } else {
    labels.value.push(id)
  }
}
</script>

<template>
  <div>
    <main>
      <section>
        <h1>Issues</h1>
        <IssuesList :labels="labels" />
      </section>
      <aside>
        <LabelList :selected="labels" @toggle="toggle" />
      </aside>
    </main>
  </div>
</template>
