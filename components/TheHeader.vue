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
          <div v-if="landmark.hoverable && landmark.isHovered" class="panel-1">
            <ul>
              <li
                v-for="(item, itemIndex) of landmark.items"
                :key="'sub-landmark-' + itemIndex"
                class="sub-landmark"
                @mouseenter="expandSubLandmark(landmarkIndex, itemIndex)"
                @mouseleave="collapseSubLandmark(landmarkIndex, itemIndex)"
              >
                <nuxt-link class="panel-1-content" :to="item.path">
                  {{ item.name }}
                  <div v-if="item.hoverable && item.isHovered" class="panel-2">
                    <ul>
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
                  </div>
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
  /* display: flex; */
  /* justify-content: space-between; */
  text-align: center;
}

@media screen and (max-width: 700px) {
  .header-content {
    float: none;
    width: 100%;
    height: 30%;
    align-items: center;
  }
}

@media screen and (max-width: 700px) {
  .header {
    float: none;
    width: 100%;
    align-items: center;
  }
}

@media screen and (max-width: 700px) {
  .landmark {
    width: 100%;
    align-items: center;
  }
}

@media screen and (max-width: 700px) {
  .center {
    float: inline-start;
    width: 100%;
  }
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
.panel-1-content {
  display: flex;
  position: relative;
  /* top: 5px; */
  background-color: #000000;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0);
  padding: 12px 16px;
  z-index: 1;
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
</style>
