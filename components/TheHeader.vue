<template>
  <header class="header">
    <div class="header-content">
      <nav class="center">
        <div
          v-for="(landmark, landmarkIndex) of landmarks"
          :key="'landmark-' + landmarkIndex"
          class="landmark"
          @mouseenter="expandLandmark(landmarkIndex)"
          @mouseleave="collapseLandmark(landmarkIndex)"
        >
          <nuxt-link :to="landmark.path">
            {{ landmark.name }}
          </nuxt-link>
          <div
            v-if="landmark.hoverable && landmark.isHovered"
            class="hover-panel"
          >
            <ul>
              <li
                v-for="(type, typeIndex) of landmark.types"
                :key="'menu-subitem-' + typeIndex"
              >
                <nuxt-link
                  class="dropdown-content"
                  :to="`/product-types/${type.name}`"
                >
                  {{ type.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['landmarks']),
  },
  methods: {
    expandLandmark(index) {
      this.$store.commit('EXPAND_LANDMARK', index)
    },
    collapseLandmark(index) {
      this.$store.commit('COLLAPSE_LANDMARK', index)
    },
  },
}
</script>

<style>
.header {
  height: 75px;
  background: black;
  color: white;
  padding-top: 25px;
  /* display: flex; */
  /* justify-content: space-between; */
  text-align: center;
}
.header-content {
  width: 100%;
  /* margin: auto; */
  align-items: center;
}
ul {
  list-style-type: none;
}
.center {
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  max-width: 70%;
}
.landmark {
  margin-right: 20px;
}
.dropdown-content {
  display: flex;
  position: relative;
  /* top: 5px; */
  background-color: #000000;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0);
  padding: 12px 16px;
  z-index: 1;
}
.title {
  font-size: 1.3rem;
  margin-bottom: 5px;
}
</style>
