<template>
  <header v-if="breadcrumbs.length > 0" class="breadcrumbs">
    <nav class="right">
      <div
        v-for="(breadcrumb, breadcrumbIndex) of breadcrumbs"
        :key="'breadcrumb-' + breadcrumbIndex"
        class="breadcrumb"
      >
        <p v-if="breadcrumb.path == null">{{ breadcrumb.name }}</p>
        <nuxt-link v-else :to="breadcrumb.path" class="link">
          {{ breadcrumb.name }}
        </nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    // new fetch
    ...mapState(['breadcrumbs']),
    // old fetch
    breadcrumbs_OLD() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')

      const breadcrumbs = []

      let path = ''
      params.forEach((param) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        console.log(match)

        if (match.name !== null) {
          breadcrumbs.push({
            name: param,
            path: match.path,
          })
          breadcrumbs.push({
            isSeparator: true,
          })
        }
      })

      breadcrumbs.pop()
      return breadcrumbs
    },
  },
}
</script>

<style>
.breadcrumbs {
  background: whitesmoke;
  color: black;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.right {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 50%;
}
.breadcrumb {
  background-color: transparent;
}
.link {
  color: black;
}
</style>
