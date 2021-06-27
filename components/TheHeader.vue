<template>
  <nav>
    <ul class="menu">
      <li class="li-logo">
        <nuxt-link :to="'/'">
          <img
            src="~/static/logo_white_large.png"
            alt="AMMS company logo"
            class="logo"
          />
        </nuxt-link>
      </li>
      <button class="hamburger" @click="toggleMenu">
        <span class="hamburger-text">menu</span>
      </button>
      <li
        v-for="(landmark, landmarkIndex) of landmarks"
        :key="'landmark-' + landmarkIndex"
        class="li-landmark"
        @mouseenter="expandLandmark(landmarkIndex)"
        @mouseleave="collapseLandmark(landmarkIndex)"
      >
        <div class="landmark-link">
          <nuxt-link :to="landmark.path">
            <h5>{{ landmark.name }}</h5>
          </nuxt-link>
          <h5 v-if="landmark.hoverable" class="landmark-arrow">+</h5>
        </div>
        <ul v-if="landmark.hoverable && landmark.isHovered" class="panel-1">
          <li
            v-for="(item, itemIndex) of landmark.items"
            :key="'sub-landmark-' + itemIndex"
            class="sub-landmark-1"
            @mouseenter="expandSubLandmark(landmarkIndex, itemIndex)"
            @mouseleave="collapseSubLandmark(landmarkIndex, itemIndex)"
          >
            <div class="landmark-link">
              <nuxt-link class="panel-1-content" :to="item.path">
                <h5>{{ item.name }}</h5>
              </nuxt-link>
              <h5 v-if="item.hoverable" class="landmark-arrow">+</h5>
            </div>
            <ul v-if="item.hoverable && item.isHovered" class="panel-2">
              <li
                v-for="(type, typeIndex) of item.types"
                :key="'type-' + typeIndex"
                class="sub-landmark-2"
              >
                <nuxt-link
                  class="panel-2-content"
                  :to="`/product-types/${type.name}`"
                  ><h5>{{ type.name }}</h5></nuxt-link
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
    toggleMenu() {
      const elements = document.getElementsByClassName('li-landmark')
      elements.forEach((e) => {
        const currentValue = e.style.display
        switch (currentValue) {
          case 'list-item':
            e.style.display = 'none'
            break
          case 'none':
            e.style.display = 'list-item'
            break
          default:
            e.style.display = 'list-item'
        }
      })
    },
  },
}
</script>

<style>
.hamburger {
  display: none;
}
.logo {
  height: 40px;
  width: auto;
}
.menu {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: left;
  margin-block-start: 0;
  margin-block-end: 0;
  height: 76px;
}

.li-landmark {
  display: list-item;
  position: relative;
  align-content: left;
  justify-content: left;
  padding-left: 40px;
  padding-top: 27px;
  height: 76px;
}

.landmark-link {
  display: flex;
  overflow: hidden;
  color: white;
  align-items: center;
  font-stretch: extra-expanded;
}
.landmark-arrow {
  margin-left: 15px;
  /* padding-bottom: 5px; */
}

ul {
  list-style-type: none;
}
li {
  list-style-type: none;
}

.panel-1 {
  width: max-content;
  padding-top: 15px;
}

.sub-landmark-1 {
  display: list-item;
  position: relative;
  background-color: #000000;
  padding: 7px 20px;
  z-index: 1;
}

.panel-2 {
  margin: 10px;
  width: max-content;
}

.panel-2 .sub-landmark-2 {
  display: flex;
  position: relative;
  justify-content: left;
  background-color: #000000;
  padding: 5px 10px;
  /* z-index: 2; */
}

@media screen and (max-width: 1000px) {
  .hamburger:hover,
  .hamburger:focus,
  .hamburger {
    border: transparent;
    border: 0;
    outline: 0;
  }
  .hamburger {
    position: absolute;
    top: 0%;
    left: 0%;
    display: block;
    background: url('~/static/hamburger.png');
    background-size: 30px;
    background-position: center;
    background-repeat: no-repeat;
    height: 75px;
  }
  .hamburger-text {
    color: transparent;
  }
  .li-logo {
    height: 75px;
    justify-content: center;
    padding-top: 20px;
    width: 100%;
  }
  .logo {
    position: relative;
  }
  .header {
    height: 100%;
    width: 100%;
  }
  .menu {
    display: list-item;
    flex-direction: column;
    height: fit-content;
    width: 100%;
    align-items: center;
  }
  .li-landmark {
    background-color: black;
    display: none;
    position: relative;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: fit-content;
    padding: 12px 16px;
    z-index: 1;
    border-top: 3px solid transparent;
    border-top-color: #444;
  }
  .header .menu .landmark .link {
    /* height: max-content; */
    width: max-content;
  }
  .panel-1 {
    height: fit-content;
    /* border-right: 3px solid #444; */
  }
}
</style>
