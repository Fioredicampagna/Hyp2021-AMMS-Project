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
      <product-links :products="area.products"></product-links>
    </section>
    <section class="products">
      <h3>Employees</h3>
      <employee-links :employees="area.employees"></employee-links>
    </section>
    <section v-if="area.types.length != 0">
      <h4>Types</h4>
      <div
        v-for="(type, typeIndex) of area.types"
        :key="'type-' + typeIndex"
        class="col-md-4"
        @click="goToPath(`/product-types/${type.name}`)"
      >
        <nuxt-link
          style="text-align: center"
          class="link"
          :to="`/producttypes/${type.name}`"
        >
          {{ type.name }}
        </nuxt-link>
      </div>
    </section>
  </section>
</template>
<script>
import EmployeeLinks from '../../components/employees/employeeLinks.vue'
import productLinks from '../../components/products/productLinks.vue'
export default {
  components: { productLinks, EmployeeLinks },
  async asyncData(ctx) {
    const { name } = ctx.route.params
    const { data } = await ctx.$axios.get(
      `${process.env.BASE_URL}/api/areas/${name}`
    )
    const breadcrumbs = [
      {
        name: 'areas',
        path: '/areas',
      },
      {
        name,
      },
    ]
    ctx.store.commit('SET_BREADCRUMBS', breadcrumbs)

    const area = data
    return {
      area,
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
  margin-top: 40px;
}
</style>
