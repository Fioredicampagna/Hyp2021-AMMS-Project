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
        <section class="area-section">
          <div class="area-link-container">
            <nuxt-link
              v-if="employee.area !== null"
              style="text-align: center"
              class="area-link"
              :to="`/areas/${employee.area.name}`"
            >
              {{ employee.area.name }}
            </nuxt-link>
          </div>
        </section>
      </div>
    </div>

    <section v-if="employee.products.length != 0">
      <h2>Has worked on:</h2>
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
          name: this.employee.name + ' description',
          content:
            'This page provides some more details about the employee ' +
            this.employee.name +
            '.',
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

.area-section {
  display: flex;
  flex-direction: row;
  margin: 40px 0;
}
.area-link-container {
  padding: 10px 20px;
  margin-right: 20px;

  width: 250px;
  text-align: center;

  border: 1px solid grey;
  border-radius: 4px;
}
.area-link {
  color: black;
}

@media screen and (max-width: 1000px) {
  .employee-preview-row {
    display: block;
  }
  .employee-image {
    max-width: 100%;
    width: min-content;
    height: auto;
    padding-left: 0;
    padding-bottom: 20px;
  }
  .employee-types-section {
    flex-direction: column;
    margin: 0;
    margin-top: 20px;
  }
  .area-link-container {
    margin-bottom: 20px;
  }
}
</style>
