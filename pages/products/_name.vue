<template>
  <section class="container">
    <header>
      <h1>{{ products.name }}</h1>
      <h4>{{ products.catchphrase }}</h4>
    </header>
    <article>
      <img
        src="@/assets/producttypes/images/4c04f6649f009a5a4832a95f6e49b2fb.png"
      />
      <p>
        {{ products.description }}
      </p>
    </article>
  </section>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    const { name } = route.params
    // console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/products/${name}`
    )
    const products = data
    return {
      products,
    }
  },
  methods: {
    goToType(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
}

img {
  max-width: 600px;
}
p {
  text-align: left;
  margin-top: 40px;
}
</style>
