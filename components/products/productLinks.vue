<template>
  <div class="container">
    <div class="row">
      <div
        v-for="(product, productIndex) of products"
        :key="'products-' + productIndex"
        class="col-md-4"
        @click="goToPath(`/products/${product.name}`)"
      >
        <div class="image-holder">
          <img :src="require(`~/assets/${product.image}`)" :alt="product.alt" />
          <h4>{{ product.name }}</h4>
          <!--nuxt-link class="link" :to="`/products/${product.name}`">
          </nuxt-link-->
        </div>
      </div>
    </div>
  </div>
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
.link {
  text-align: center;
  color: rgb(0, 0, 0);
  padding: 20px;
  margin: 10px;
}
.image-holder {
  cursor: pointer;
  border-radius: 25px;
  background: #f7f7f8;
  margin: 5px;
}
.col-md-4 {
  text-align: center;
}
img {
  padding-top: 20px;
  /* max-width: 600px; */
  width: 80%;
  height: 300px;
  max-width: 400px;
  margin: auto;
  /* background-size: cover; */
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
}
p {
  text-align: left;
  /* margin-top: 40px; */
}
</style>
