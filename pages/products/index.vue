<template>
  <main>
    <div v-for="(area, areaIndex) of productsStruct" :key="'area-' + areaIndex">
      <header>
        <h1>{{ area.areaName }}</h1>
      </header>
      <section>
        <product-links :products="area.products"></product-links>
      </section>
    </div>
  </main>
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
