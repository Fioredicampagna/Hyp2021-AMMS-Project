<template>
  <section>
    <div class="employee-preview-row">
      <img
        img
        :src="require(`~/assets/${employee.image}`)"
        :alt="employee.alt"
        class="employee-image"
      />
      <div>
        <h2>{{ employee.name }}</h2>
        <p>
          {{ employee.presentation }}
        </p>
      </div>
    </div>
    <div>
      <nuxt-link
        v-if="employee.area !== null"
        style="text-align: center"
        class="link"
        :to="`/areas/${employee.area.name}`"
      >
        {{ employee.area.name }}
      </nuxt-link>
      <h2 v-if="employee.products.length != 0">Has worked on:</h2>
    </div>
    <section v-if="employee.products.length != 0">
      <product-links :products="employee.products"></product-links>
    </section>
  </section>
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
  head() {
    return {
      title: this.employee.name + ' - AMMS Employees',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: this.employee.name + ' description',
          name:
            'This page provides some more details about the employee ' +
            this.employee.name +
            '.',
          content: '',
        },
      ],
    }
  },
}
</script>

<style scoped>
.employee-preview-row {
  display: flex;
  padding-top: 40px;
  padding-bottom: 20px;
  align-items: center;
}

.employee-image {
  max-width: 500px;
  width: auto;
  height: min-content;
  /* padding: 20px 0; */
  padding-right: 40px;
}
.link {
  color: cadetblue;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2);
  text-align: center;
}
</style>
