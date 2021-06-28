<template>
  <main>
    <header>
      <h1>Areas of our company</h1>
    </header>
    <section class="article-grid">
      <div
        v-for="(area, areaIndex) of areas"
        :key="'art-' + areaIndex"
        class="article"
        @click="goToArea(`/areas/${area.name}`)"
      >
        <area-preview
          :name="area.name"
          :image="area.image"
          :alt="area.alt"
        ></area-preview>
      </div>
    </section>
  </main>
</template>

<script>
import AreaPreview from '../../components/areas/areaPreview.vue'

export default {
  components: {
    AreaPreview,
  },
  async asyncData({ $axios, store }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    const areas = data

    const breadcrumbs = [
      {
        name: 'areas',
      },
    ]
    store.commit('SET_BREADCRUMBS', breadcrumbs)

    return {
      areas,
    }
  },
  head() {
    return {
      title: 'AMMS Areas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'Areas description',
          name: 'Area description',
          content:
            'This page provides a general description of the main website areas.',
        },
      ],
    }
  },
  methods: {
    goToArea(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 10px;
  margin-top: 40px;
}
.article {
  cursor: pointer;
  margin-bottom: 20px;
}
.ad img {
  width: 100%;
  height: 200px;
}
</style>
