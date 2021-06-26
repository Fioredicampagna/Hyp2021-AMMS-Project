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
        <nuxt-link :to="landmark.path" class="link">
          {{ landmark.name }}
        </nuxt-link>
        <ul v-if="landmark.hoverable && landmark.isHovered" class="panel-1">
          <li
            v-for="(item, itemIndex) of landmark.items"
            :key="'sub-landmark-' + itemIndex"
            class="sub-landmark-1"
            @mouseenter="expandSubLandmark(landmarkIndex, itemIndex)"
            @mouseleave="collapseSubLandmark(landmarkIndex, itemIndex)"
          >
            <nuxt-link class="panel-1-content" :to="item.path">
              {{ item.name }}
            </nuxt-link>
            <ul v-if="item.hoverable && item.isHovered" class="panel-2">
              <li
                v-for="(type, typeIndex) of item.types"
                :key="'type-' + typeIndex"
                class="sub-landmark-2"
              >
                <nuxt-link
                  class="panel-2-content"
                  :to="`/product-types/${type.name}`"
                  >{{ type.name }}</nuxt-link
                >
              </li>
            </ul>
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
  background: black;
  color: white;
  text-align: center;
  height: 76px;
}

.header .menu {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 0;
  height: 76px;
}

.header .menu .landmark {
  position: relative;
  align-content: center;
  padding: 30px;
  height: 76px;
}

.header .menu .link {
  overflow: hidden;
  color: white;
  align-items: center;
}

ul {
  list-style-type: none;
}
li {
  list-style-type: none;
}

.panel-1 {
  margin: 10px;
  width: max-content;
}

.panel-1 .sub-landmark-1 {
  display: flex;
  position: relative;
  background-color: #000000;
  border-bottom: 3px solid transparent;
  padding: 12px 16px;
  z-index: 1;
  border-bottom-color: #444;
}

.panel-2 {
  margin: 10px;
  width: max-content;
}

.panel-2 .sub-landmark-2 {
  display: flex;
  position: relative;
  justify-content: center;
  background-color: #000000;
  border-bottom: 3px solid transparent;
  padding: 12px 16px;
  z-index: 1;
  border-bottom-color: rgb(128, 5, 5);
}

@media screen and (max-width: 800px) {
  .header {
    height: 100%;
    width: 150%;
  }
  .header .menu {
    height: 100%;
    flex-direction: column;
    width: max-content;
    border-bottom: 3px solid transparent;
    border-bottom-color: #444;
  }
  .header .menu .landmark {
    display: flex;
    position: relative;
    /* justify-content: center; */
    width: 100%;
    height: 100%;
    height: max-content;
    border-bottom: 3px solid transparent;
    padding: 12px 16px;
    z-index: 1;
    border-bottom-color: #444;
  }
  .header .menu .landmark .link {
    height: max-content;
    width: max-content;
  }
  .panel-1 {
    border-right: 3px solid #444;
  }
}
</style>
