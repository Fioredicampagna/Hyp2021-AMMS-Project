<template>
  <section class="container">
    <div v-for="(product, productIndex) of products" :key="'products-' + productIndex" class="row">
      <div class="col-md-6">
        <p style="text-align:center">{{ product.name }}</p>
      </div>
      <div class="col-md-6">
         <p style="text-align:center" @click="goToArea(`/areas/${product.name}`)">{{ product.catchphrase }}</p>
      </div>
    </div>    
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { product_name } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/products/${product_name}`
    )    
    const products = data
    return {
      products,
    }
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
