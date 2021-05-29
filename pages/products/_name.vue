<template>
  <section class="container">
    <div class="row">
      <div class="col-md-6">
        <img img :src="require(`~${product.image}`)" />
      </div>
      <div class="col-md-6 centerize">
        <h2>{{ product.name }}</h2>
        <h4>{{ product.catchphrase }}</h4>
        <p>{{ product.description }}</p>
        <nuxt-link
          style="text-align: center"
          class="link"
          :to="`/areas/${product.area.name}`"
        >
          {{ product.area.name }}
        </nuxt-link>
        <nuxt-link
          v-if="product.type !== null"
          style="text-align: center"
          class="link"
          :to="`/producttypes/${product.type.name}`"
        >
          {{ product.type.name }}
        </nuxt-link>
      </div>
    </div>

    <div v-if="product.products.length != 0">
      <header class="related-products">
        <h1>Other Products</h1>
      </header>
      <product-links :products="product.products"></product-links>
    </div>

    <div>
      <header class="related-products">
        <h2>Who worked on this product</h2>
      </header>
      <employee-links :employees="product.employees"></employee-links>
    </div>
  </section>
</template>

<script>
import EmployeeLinks from '../../components/employees/employeeLinks.vue'
import productLinks from '../../components/products/productLinks.vue'
export default {
  components: { productLinks, EmployeeLinks },
  async asyncData({ $axios, route, store }) {
    const { name } = route.params
    // console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/products/${name}`
    )
    const product = data
    const breadcrumbs = [
      {
        name: 'areas',
        path: '/areas',
      },
      {
        name: product.area.name,
        path: '/areas/' + product.area.name,
      },
      {
        name: product.name,
      },
    ]
    if (product.type != null)
      breadcrumbs.splice(2, 0, {
        name: product.type.name,
        path: '/product-types/' + product.type.name,
      })

    store.commit('SET_BREADCRUMBS', breadcrumbs)
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
.link {
  color: cadetblue;
  padding: 20px;
  margin: 10px;
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
