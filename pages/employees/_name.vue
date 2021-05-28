<template>
  <div class="container">
    <div class="row">
      <section class="col-md-3">
        <img
          :src="require(`~/assets/employees/images/${employee.image_name}.jpg`)"
        />
        <h4>{{ employee.name }}</h4>
      </section>

      <section class="col-md-7">
        <p>
          {{ employee.presentation }}
        </p>
      </section>

      <nuxt-link
        v-if="employee.area !== null"
        style="text-align: center"
        class="link"
        :to="`/areas/${employee.area.name}`"
      >
        {{ employee.area.name }}
      </nuxt-link>

      <section v-if="employee.products.length != 0">
        <h2>Has worked on:</h2>
        <product-links :products="employee.products"></product-links>
      </section>
    </div>
  </div>
</template>
<script>
import productLinks from '../../components/products/productLinks.vue'
export default {
  components: { productLinks },
  async asyncData({ $axios, route, store }) {
    const { name } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/employees/${name}`
    )
    const employee = data
    const breadcrumbs = [
      {
        name: 'employees',
        path: '/employees',
      },
      {
        name: employee.name,
      },
    ]
    store.commit('SET_BREADCRUMBS', breadcrumbs)
    return {
      employee,
    }
  },
}
</script>

<style scoped>
h4 {
  margin: 20px 0;
}
.col-md-7 {
  box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2);
}

.container {
  position: relative;
  padding-left: 6.5%;
}
section {
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}
img {
  max-width: 300px;
}
p {
  margin: 10px;
  text-align: left;
}
</style>
