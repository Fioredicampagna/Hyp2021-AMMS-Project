<template>
  <div>
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
