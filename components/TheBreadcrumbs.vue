<template>
  <nav v-if="breadcrumbs.length > 0">
    <ul>
      <li
        v-for="(breadcrumb, breadcrumbIndex) of breadcrumbs"
        :key="'breadcrumb-' + breadcrumbIndex"
        class="breadcrumb"
      >
        <a v-if="breadcrumb == null" class="divisor">></a>
        <a v-else-if="breadcrumb.path == null" class="name">{{
          breadcrumb.name
        }}</a>
        <nuxt-link v-else :to="breadcrumb.path" class="link">
          {{ breadcrumb.name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['breadcrumbs']),
  },
}
</script>

<style>
ul {
  padding: 0;
  margin: 0;
}

.breadcrumb {
  height: fit-content;
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  background-color: transparent;
  padding: 0;
  padding-right: 15px;
  height: 45px;
}

.name {
  font-weight: bold;
}

.link {
  color: black;
}

.link:hover {
  color: black;
  text-decoration: underline;
}
</style>
