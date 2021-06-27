<template>
  <section class="product-grid">
    <div
      v-for="(product, productIndex) of products"
      :key="'products-' + productIndex"
      class="product"
      @click="goToPath(`/products/${product.name}`)"
    >
      <div class="image-holder">
        <img
          :src="require(`~/assets/${product.image}`)"
          :alt="product.alt"
          class="product-front-image"
        />
        <h5>{{ product.name }}</h5>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    products: { type: Array, default: () => Array },
  },
  methods: {
    goToPath(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 35px;
  margin-top: 20px;
}
.image-holder {
  cursor: pointer;
  width: 100%;
  height: 95%;
  /* border: 1px solid grey; */
  border-radius: 4px;
}
.product {
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
  max-width: 350px;
}
.product-front-image {
  padding-top: 20px;
  width: 80%;
  height: auto;
  max-height: 250px;
  max-width: 400px;
  margin: auto;
  object-fit: scale-down;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  /* align-items: center; */
}
</style>
