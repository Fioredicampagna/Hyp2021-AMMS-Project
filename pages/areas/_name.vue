<template>
  <section class="container">
    <header>
      <h1>{{ area.name }}</h1>
      <h4>{{ area.introduction }}</h4>
      <!--img :src="area.image" :alt="area.introduction" /-->
    </header>
    <article>
      <p>
        {{ area.description }}
      </p>
    </article>
    <section class="products">
      <h3>Products</h3>
      <div
        v-for="(product, productIndex) of area.products"
        :key="'products-' + productIndex"
        class="product"
        @click="goToProduct(`/products/${product.name}`)"
      >
        <!-- add product preview component -->
        <div class="content">
          {{ product.image }}
          <nuxt-link :to="`/products/${product.name}`">
            {{ product.name }}
          </nuxt-link>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { name } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/areas/${name}`
    )
    const area = data
    return {
      area,
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
  margin-top: 40px;
}
</style>
