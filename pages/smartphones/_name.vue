<template>
  <main class="container">
    <header>
      <h1>{{ smartphone.name }}</h1>
      <h4>Subtitle</h4>
    </header>
    <section class="smartphone-detail">
      <div>
        <p>{{ smartphone.catchphrase }}</p>
        <p>{{ smartphone.description }}</p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    const { name } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/smartphones/${name}`
    )
    const smartphone = data
    return { smartphone }
  },
}
</script>

<style></style>
