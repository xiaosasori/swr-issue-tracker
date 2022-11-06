import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { Icon } from '@iconify/vue'
import './assets/main.css'
import { worker } from './mock'

worker.start({
  quiet: true,
  onUnhandledRequest: 'bypass',
})
setTimeout(() => {
  const app = createApp(App)

  app.use(router)
  app.use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          // useErrorBoundary: true,
          refetchOnWindowFocus: false,
          // retry(failureCount: number, error: any) {
          //   if (error.status === 404) return false
          //   else if (failureCount < 2) return true
          //   else return false
          // },
        },
      },
    },
  })
  app.component('Icon', Icon)
  app.mount('#app')
}, 500)
