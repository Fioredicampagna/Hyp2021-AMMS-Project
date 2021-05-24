<template>
  <header class="header">
    <div class="header-content">
      <nav class="right">
        <div
          v-for="(landmark, landmarkIndex) of landmarks"
          :key="'menu-item-' + landmarkIndex"
          class="menu-item"
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
                <nuxt-link :to="`/producttypes/${type.name}`">
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
  height: 70px;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.header-content {
  width: 100%;
  margin: auto;
  align-items: center;
}
.right {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  max-width: 50%;
}
.title {
  font-size: 1.3rem;
  margin-bottom: 5px;
}
</style>
