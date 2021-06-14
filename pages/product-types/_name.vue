<template>
  <section class="container">
    <header>
      <h1>{{ type.name }}</h1>
      <h4>{{ type.description }}</h4>
    </header>
    <product-links :products="type.products"></product-links>
  </section>
</template>

<script>
import productLinks from '../../components/products/productLinks.vue'

export default {
  components: { productLinks },
  async asyncData({ $axios, route, store }) {
    const { name } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/types/${name}`
    )

    const type = data
    const breadcrumbs = [
      {
        name: 'areas',
        path: '/areas',
      },
      {
        name: type.area.name,
        path: '/areas/' + type.area.name,
      },
      {
        name: type.name,
      },
    ]
    store.commit('SET_BREADCRUMBS', breadcrumbs)
    return {
      type,
    }
  },
  head() {
    return {
      title: this.type.area.name + ': ' + this.type.name + ' - AMMS Employees',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: this.type.name + ' description',
          name: 'description',
          content:
            'This page provides some more details about the ' +
            this.type.name +
            ' type inside the ' +
            this.type.area.name +
            ' area.',
        },
      ],
    }
  },
  methods: {
    goToProduct(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
}
.comments {
  margin-top: 60px;
  text-align: left;
}
.comment {
  padding: 20px;
  background: #f7f7f7;
  border: 1px solid darkgray;
  margin: 10px;
}
.comment .date {
  color: darkgray;
  font-size: 14px;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
  /* margin-top: 40px; */
}
</style>
