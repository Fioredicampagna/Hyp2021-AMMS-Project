<template>
  <header v-if="breadcrumbs.length > 0">
    <nav class="right">
      <ul class="breadcrumbs">
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
  </header>
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
.breadcrumbs {
  height: fit-content;
  background-color: whitesmoke;
}
.breadcrumbs li {
  display: inline;
  font-size: 14;
  background-color: transparent;
}

.link {
  color: #0275d8;
}

.link:hover {
  color: #01447e;
  text-decoration: underline;
}
</style>
