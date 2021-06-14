<template>
  <p>Who we are page</p>
</template>

<script>
export default {
  head() {
    return {
      title: 'AMMS Who We Are',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'Who We Are description',
          name: 'About description',
          content:
            'This page provides a general description of the AMMS company.',
        },
      ],
    }
  },
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
