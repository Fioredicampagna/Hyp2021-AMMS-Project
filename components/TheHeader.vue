<template>
  <header class="header">
    <div class="header-content">
      <nav class="right">
        <div
          v-for="(item, itemIndex) of landmarks"
          :key="'menu-item-' + itemIndex"
          class="menu-item"
          @mouseenter="onHover(itemIndex)"
          @mouseleave="onHover(itemIndex)"
        >
          <nuxt-link :to="item.path">
            {{ item.name }}
          </nuxt-link>
          <div v-if="item.hoverable && item.isHovered" class="hover-panel">
            <ul>
              <li
                v-for="(subitem, subItemIndex) of item.data"
                :key="'menu-subitem-' + subItemIndex"
              >
                <nuxt-link :to="subitem.path">
                  {{ subitem.name }}
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
    onHover(index) {
      this.$store.commit('HOVER_LANDMARK', index)
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
