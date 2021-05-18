<template>
  <section class="container">
    <div class="row">
      <div class="col-md-6">
        <img
          src="@/assets/producttypes/images/4c04f6649f009a5a4832a95f6e49b2fb.png"
        />
      </div>
      <div class="col-md-6 centerize">
        <h2>{{ product.name }}</h2>
        <h4>{{ product.catchphrase }}</h4>
        <p>{{ product.description }}</p>
      </div>
    </div>
    <header class="related-products">
      <h1>Other Products</h1>
    </header>

    <div
      v-for="(relatedProduct, relatedProductIndex) of product.products"
      :key="'related-product-' + relatedProductIndex"
      class="row"
      @click="goToPath(`/products/${product.name}`)"
    >
      <div class="col-md-3 col-xs-6">
        <img
          src="@/assets/producttypes/images/4c04f6649f009a5a4832a95f6e49b2fb.png"
        />
        <b>{{ relatedProduct.name }}</b>
      </div>
    </div>

    <!-- <header>
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
    </article> -->
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
    const product = data
    return {
      product,
    }
  },
  methods: {
    goToPath(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
.related-products {
  margin-top: 10%;
}
.centerize {
  align-self: center;
}
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
