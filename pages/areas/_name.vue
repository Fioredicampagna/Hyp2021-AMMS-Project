<template>
  <section>
    <div class="area-preview-row">
      <img
        img
        :src="require(`~/assets/${area.image}`)"
        :alt="area.alt"
        class="area-image"
      />
      <div>
        <h2>{{ area.name }}</h2>
        <h4>{{ area.introduction }}</h4>
        <p>
          {{ area.description }}
        </p>
      </div>
    </div>
    <section v-if="area.types.length != 0">
      <h3>Types</h3>
      <section class="area-types-section">
        <div
          v-for="(type, typeIndex) of area.types"
          :key="'type-' + typeIndex"
          class="type-link-container"
          @click="goToPath(`/product-types/${type.name}`)"
        >
          <nuxt-link
            class="type-link"
            style="text-align: center"
            :to="`/product-types/${type.name}`"
          >
            {{ type.name }}
          </nuxt-link>
        </div>
      </section>
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
.area-preview-row {
  display: flex;
  padding-top: 40px;
  padding-bottom: 20px;
}

.area-types-section {
  display: flex;
  flex-direction: row;
  margin: 40px 0;
}
.type-link-container {
  padding: 10px 20px;
  margin-right: 20px;

  width: 250px;
  text-align: center;

  border: 1px solid grey;
  border-radius: 4px;
}
.type-link {
  color: black;
}
.area-image {
  max-width: 500px;
  width: auto;
  height: min-content;
  /* padding: 20px 0; */
  padding-right: 40px;
}
p {
  margin-top: 20px;
}

@media screen and (max-width: 1000px) {
  .area-preview-row {
    display: block;
  }
  .area-image {
    max-width: 100%;
    width: min-content;
    height: auto;
    padding-left: 0;
  }
  .area-types-section {
    flex-direction: column;
    margin: 0;
    margin-top: 20px;
  }
  .type-link-container {
    margin-bottom: 20px;
  }
}
</style>
