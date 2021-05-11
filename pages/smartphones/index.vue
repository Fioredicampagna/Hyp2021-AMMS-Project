<template>
  <main class="container">
    <header>
      <h1>Smartphones</h1>
      <h4>Subtitle</h4>
    </header>
    <section class="smartphone-list">
      <div
        v-for="(smartphone, smartphoneIndex) of smartphones"
        :key="'smart-' + smartphoneIndex"
        class="smartphone"
        @click="goToPage(`/smartphones/${smartphone.name}`)"
      >
        <h4>{{ smartphone.name }}</h4>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/smartphones`)
    const smartphones = data
    return { smartphones }
  },
  methods: {
    goToPage(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
</style>
