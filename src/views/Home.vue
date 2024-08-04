<template>
    <Sidebar />
    <Wrapper  />
</template>

<script setup>
import Sidebar from "./Sidebar.vue"
import Wrapper from "./Wrapper.vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const cleanupExpiredItems = () => {
  const currentTimestamp = new Date().getTime()
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const storedData = localStorage.getItem(key)
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      if (parsedData.expirationTime && parsedData.expirationTime <= currentTimestamp) {
        localStorage.removeItem(key)
        if (key == "token") {
            window.location.reload()
        }
      }
    }
  }
}
cleanupExpiredItems()

</script>

<style scoped>
</style>