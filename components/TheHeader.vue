<template>
  <nav class="header">
    <ul class="menu">
      <li
        v-for="(landmark, landmarkIndex) of landmarks"
        :key="'landmark-' + landmarkIndex"
        class="landmark"
        @mouseenter="expandLandmark(landmarkIndex)"
        @mouseleave="collapseLandmark(landmarkIndex)"
      >
        <nuxt-link :to="landmark.path">
          {{ landmark.name }}
        </nuxt-link>
        <ul v-if="landmark.hoverable && landmark.isHovered" class="panel-1">
          <li
            v-for="(item, itemIndex) of landmark.items"
            :key="'sub-landmark-' + itemIndex"
            class="sub-landmark"
            @mouseenter="expandSubLandmark(landmarkIndex, itemIndex)"
            @mouseleave="collapseSubLandmark(landmarkIndex, itemIndex)"
          >
            <nuxt-link class="panel-1-content" :to="item.path">
              {{ item.name }}
              <ul v-if="item.hoverable && item.isHovered" class="panel-2">
                <li
                  v-for="(type, typeIndex) of item.types"
                  :key="'type-' + typeIndex"
                  class="type"
                >
                  <nuxt-link
                    class="panel-2-content"
                    :to="`/product-types/${type.name}`"
                    >{{ type.name }}</nuxt-link
                  >
                </li>
              </ul>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
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
    expandSubLandmark(index, subIndex) {
      const payload = {
        landmarkIndex: index,
        subLandmarkIndex: subIndex,
      }
      this.$store.commit('EXPAND_SUB_LANDMARK', payload)
    },
    collapseSubLandmark(index, subIndex) {
      const payload = {
        landmarkIndex: index,
        subLandmarkIndex: subIndex,
      }
      this.$store.commit('COLLAPSE_SUB_LANDMARK', payload)
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
  text-align: center;
}

ul {
  list-style-type: none;
}
li {
  list-style-type: none;
}
.menu {
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  margin: auto;
  max-width: 70%;
}
.landmark {
  margin-right: 40px;
}

.panel-1 {
  margin: 10px;
  width: max-content;
}

.panel-1-content {
  display: flex;
  position: relative;
  background-color: #000000;
  border-bottom: 3px solid transparent;
  padding: 12px 16px;
  z-index: 1;
  border-bottom-color: #444;
}

.panel-2-content {
  display: flex;
  position: relative;
  background-color: #000000;
  border-bottom: 3px solid transparent;
  padding: 12px 16px;
  z-index: 1;
  border-bottom-color: #444;
}

.panel-2-content {
  display: flex;
  position: relative;
  /* top: 5px; */
  background-color: #000000;
  min-width: 160px;
  max-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0);
  padding: 12px 16px;
  z-index: 1;
}

.title {
  font-size: 1.3rem;
  margin-bottom: 5px;
}

@media screen and (max-width: 700px) {
  .header {
    background: black;
    z-index: 1;
  }
}
</style>
