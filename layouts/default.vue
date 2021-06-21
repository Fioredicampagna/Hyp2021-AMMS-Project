<template>
  <div class="content">
    <the-header></the-header>
    <the-breadcrumbs></the-breadcrumbs>
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheBreadcrumbs from '~/components/TheBreadcrumbs.vue'

export default {
  components: {
    TheHeader,
    TheBreadcrumbs,
  },
}
</script>

<style>
.content {
  margin: auto;
  max-width: 100%;
  align-items: center;
}
h1 {
  text-align: center;
  height: 100px;
}
h3 {
  text-align: center;
}
h4 {
  text-align: center;
  height: 60px;
}
html {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}
a {
  color: white;
}
a:hover {
  color: white;
}
img {
  width: 100%;
}
</style>
