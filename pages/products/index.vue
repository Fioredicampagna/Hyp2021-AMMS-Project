<template>
  <section class="container">
    <div
      v-for="(area, areaIndex) of productsStruct"
      :key="'area-' + areaIndex"
      style="text-align: center"
      class="row"
    >
      <h1 class="col">{{ area.areaName }}</h1>
      <section v-if="area.products.length != 0" class="products">
        <product-links :products="area.products"></product-links>
      </section>
    </div>
  </section>
</template>

<script>
import productLinks from '../../components/products/productLinks.vue'

export default {
  components: { productLinks },
  async asyncData(ctx) {
    const breadcrumbs = [
      {
        name: 'products',
      },
    ]
    ctx.store.commit('SET_BREADCRUMBS', breadcrumbs)

    const { data } = await ctx.$axios.get(
      `${process.env.BASE_URL}/api/landmarks`
    )
    const areaNames = data

    const productsStruct = []
    for (let i = 0; i < areaNames.length; i++) {
      const areaName = areaNames[i].name
      const { data } = await ctx.$axios.get(
        `${process.env.BASE_URL}/api/areas/${areaName}`
      )
      productsStruct.push({
        areaName,
        products: data.products,
      })
    }

    return {
      productsStruct,
    }
  },
  head() {
    return {
      title: 'AMMS Products',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'Products description',
          name: 'description',
          content:
            'This page provides a list of all products of the AMMS company.',
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
  .h1 {
    float: none;
    width: 100%;
    align-items: center;
  }
}

h1 {
  text-align: center;
  height: 50%;
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
  width: 100%;
}
p {
  text-align: center;
  margin-top: 40px;
}

.container {
  width: 100%;
}

section {
  margin-top: 50px;
}
</style>
