<template>
  <div class="container">
    <div class="row">
      <div
        v-for="(product, productIndex) of products"
        :key="'products-' + productIndex"
        class="col-md-4"
        @click="goToPath(`/products/${product.name}`)"
      >
        <!--div class="content">
          {{ product.image }}
        </div-->
        <img :src="require(`~${product.image}`)" />
        <nuxt-link
          style="text-align: center"
          class="link"
          :to="`/products/${product.name}`"
        >
          {{ product.name }}
        </nuxt-link>
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
h4 {
  margin: 30px 0;
}

.link {
  color: cadetblue;
  padding: 20px;
  margin: 10px;
}

img {
  max-width: 600px;
}
p {
  text-align: left;
  /* margin-top: 40px; */
}
</style>
