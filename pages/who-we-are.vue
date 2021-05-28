<template>
  <p>Who we are page</p>
</template>

<script>
export default {
  created() {
    const breadcrumbs = [
      {
        name: 'who we are',
      },
    ]
    this.$store.commit('SET_BREADCRUMBS', breadcrumbs)
  },
}
</script>

<style></style>
