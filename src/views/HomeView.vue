<script setup>
import { ref } from 'vue'
import IssuesList from '@/components/IssuesList.vue'
import LabelList from '@/components/LabelList.vue'
import StatusSelect from '@/components/StatusSelect.vue'

const labels = ref([])
const status = ref('backlog')
const pageNum = ref(1)

function toggle(id) {
  if (labels.value.includes(id)) {
    labels.value = labels.value.filter((label) => label !== id)
  } else {
    labels.value.push(id)
  }
  pageNum.value = 1
}

function setStatus(e) {
  status.value = e.target.value
  pageNum.value = 1
}
</script>

<template>
  <div>
    <main>
      <section>
        <IssuesList
          :labels="labels"
          :status="status"
          v-model:pageNum="pageNum"
        />
      </section>
      <aside>
        <LabelList :selected="labels" @toggle="toggle" />
        <h3>Status</h3>
        <StatusSelect :value="status" @change="setStatus" />
        <hr />
        <router-link class="button" to="/add"> Add Issue </router-link>
      </aside>
    </main>
  </div>
</template>
