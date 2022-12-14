import { ref, unref, onMounted, onUnmounted } from 'vue'

export const useIntersectionObserver = (el, options = {}, onEntry) => {
  let observer = null
  const isIntersecting = ref(false)

  onMounted(() => {
    const $el = unref(el)
    if (!($el instanceof HTMLElement)) {
      throw new Error(
        'useIntersectionObserver: ref.value is not an HTMLElement'
      )
    }

    // Render the VeryLargeComponent when the container intersects
    const intersectionCallback = (entries) => {
      entries.forEach((entry) => {
        isIntersecting.value = entry.isIntersecting
        if (typeof onEntry === 'function') onEntry(entry)
      })
    }
    observer = new IntersectionObserver(intersectionCallback, options)

    observer.observe($el)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    isIntersecting,
    observer,
  }
}
