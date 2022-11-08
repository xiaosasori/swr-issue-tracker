<script setup>
import { ref } from 'vue'
import IssuesList from '@/components/IssuesList.vue'
import LabelList from '@/components/LabelList.vue'
import StatusSelect from '@/components/StatusSelect.vue'

const labels = ref([])
const status = ref('backlog')

function toggle(id) {
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
        <IssuesList :labels="labels" :status="status" />
      </section>
      <aside>
        <LabelList :selected="labels" @toggle="toggle" />
        <h3>Status</h3>
        <StatusSelect :value="status" @change="status = $event.target.value" />
      </aside>
    </main>
  </div>
</template>
