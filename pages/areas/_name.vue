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
    <section v-if="area.types.length != 0">
      <h4>Types</h4>
      <div
        class="row"
        v-for="(type, typeIndex) of area.types"
        :key="'type-' + typeIndex"
        @click="goToPath(`/product-types/${type.name}`)"
      >
        <nuxt-link
          style="text-align: center"
          class="col-md-4"
          :to="`/producttypes/${type.name}`"
        >
          {{ type.name }}
        </nuxt-link>
      </div>
    </section>
    <section class="products">
      <h3>Products</h3>
      <product-links :products="area.products"></product-links>
    </section>
    <section class="products">
      <h3>Employees</h3>
      <employee-links :employees="area.employees"></employee-links>
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
  head() {
    return {
      title: this.area.name + ' - AMMS Areas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: this.area.name + ' description',
          name: 'description',
          content: '',
        },
      ],
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
.col-md-4 {
  color: cadetblue;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2);
}
img {
  max-width: 600px;
}
p {
  text-align: left;
  margin-top: 40px;
}
</style>
