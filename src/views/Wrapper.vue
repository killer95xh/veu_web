<template>
  <div id="wrapper-side" class="wrapper d-flex flex-column min-vh-100 bg-light">
    <Header />
    <Body />
    <Footer />
  </div>
</template>

<script setup>
import Header from "./layouts/Header.vue"
import Body from "./layouts/Body.vue"
import Footer from "./layouts/Footer.vue"
</script>

<style scoped></style>