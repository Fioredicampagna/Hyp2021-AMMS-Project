<template>
  <section class="container">
    <h1>{{ area.name }}</h1>
    <div class="row">
      <div class="col-md-6">
        <img img :src="require(`~/assets/${area.image}`)" :alt="area.alt" />
      </div>
      <div class="col-md-6">
        <h4 class="col">{{ area.introduction }}</h4>
        <p class="col">
          {{ area.description }}
        </p>
      </div>
    </div>
    <section v-if="area.types.length != 0">
      <h4>Types</h4>
      <div
        v-for="(type, typeIndex) of area.types"
        :key="'type-' + typeIndex"
        style="text-align: center"
        class="row"
        @click="goToPath(`/product-types/${type.name}`)"
      >
        <nuxt-link
          style="text-align: center"
          class="col-sm-4"
          :to="`/product-types/${type.name}`"
        >
          {{ type.name }}
        </nuxt-link>
      </div>
    </section>
    <section v-if="area.products.length != 0" class="products">
      <h3>Products</h3>
      <product-links :products="area.products"></product-links>
    </section>
    <section v-if="area.employees.length != 0" class="products">
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
          content:
            'This page provides some more details about the ' +
            this.area.name +
            ' area.',
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
  text-align: center;
}

@media screen and (max-width: 700px) {
  .h4 {
    float: none;
    width: 100%;
    align-items: center;
  }
}

h1 {
  text-align: center;
}
.col {
  width: 100%;
  white-space: normal;
  overflow: scroll;
  float: inline-start;
}
h3 {
  padding: 20px;
}
.col-sm-4 {
  color: cadetblue;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2);
  justify-content: space-between;
}
.row {
  margin: 20px;
}
img {
  max-width: 600px;
}
p {
  text-align: center;
  margin-top: 40px;
}

section {
  margin-top: 50px;
}
</style>
