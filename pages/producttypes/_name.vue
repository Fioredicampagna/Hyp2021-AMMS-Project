<template>
  <section class="container">
    <header>
      <h1>{{ type.name }}</h1>
      <h4>{{ type.description }}</h4>
    </header>
    <div class="row">
      <div
        v-for="(product, productIndex) of type.products"
        :key="'products-' + productIndex"
        class="col-md-4"
        @click="goToProduct(`/products/${product.name}`)"
      >
        <img
          src="@/assets/producttypes/images/4c04f6649f009a5a4832a95f6e49b2fb.png"
        />
        <p style="text-align: center">{{ product.name }}</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { name } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/types/${name}`
    )
    const type = data
    return {
      type,
    }
  },
  methods: {
    goToProduct(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
}
.comments {
  margin-top: 60px;
  text-align: left;
}
.comment {
  padding: 20px;
  background: #f7f7f7;
  border: 1px solid darkgray;
  margin: 10px;
}
.comment .date {
  color: darkgray;
  font-size: 14px;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
  /* margin-top: 40px; */
}
</style>
