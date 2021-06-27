<template>
  <section>
    <div class="area-preview-row">
      <img
        img
        :src="require(`~/assets/${product.image}`)"
        :alt="product.alt"
        class="area-image"
      />
      <div>
        <h2>{{ product.name }}</h2>
        <h4>{{ product.catchphrase }}</h4>
        <p>{{ product.description }}</p>
        <section class="area-types-section">
          <div class="type-link-container">
            <nuxt-link
              style="text-align: center"
              class="type-link"
              :to="`/areas/${product.area.name}`"
            >
              {{ product.area.name }}
            </nuxt-link>
          </div>
          <div v-if="product.type !== null" class="type-link-container">
            <nuxt-link
              style="text-align: center"
              class="type-link"
              :to="`/product-types/${product.type.name}`"
            >
              {{ product.type.name }}
            </nuxt-link>
          </div>
        </section>
      </div>
    </div>

    <div v-if="product.related.length != 0" class="related-products">
      <h1>Other Products</h1>
      <product-links :products="product.related"></product-links>
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
  head() {
    return {
      title: this.product.name + ' - AMMS Products',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: this.product.name + ' description',
          name: 'description',
          content:
            'This page provides some more details about the the product ' +
            this.product.name +
            ' inside the ' +
            this.product.area.name +
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
.related-products {
  margin-top: 10%;
}

.area-preview-row {
  display: flex;
  padding-top: 40px;
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
  padding: 20px 0;
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
