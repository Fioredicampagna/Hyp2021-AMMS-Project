<template>
  <header class="header">
    <div class="header-content">
      <!-- <div class="title"><h3>WebSite</h3></div> -->
      <nav class="right">
        <div
          v-for="(item, itemIndex) of menuOptions"
          :key="'menu-item-' + itemIndex"
          class="menu-item"
          @mouseenter="item.isHovered = true"
          @mouseleave="item.isHovered = false"
        >
          <nuxt-link :to="item.path">
            {{ item.name }}
          </nuxt-link>
          <div class="hover-panel" v-if="item.hoverable && item.isHovered">
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
export default {
  data() {
    return {
      menuOptions: [
        {
          name: 'Home',
          path: '/',
          hoverable: false,
          isHovered: false,
        },
        {
          name: 'PCs',
          path: '/pcs',
          hoverable: true,
          isHovered: false,
          data: [
            {
              name: 'Home',
              path: '/',
            },
          ],
        },
        {
          name: 'Smartphones',
          path: '/smartphones',
          hoverable: false,
          isHovered: false,
        },
        {
          name: 'Software',
          path: '/software',
          hoverable: false,
          isHovered: false,
        },
        {
          name: 'Cloud',
          path: '/cloud',
          hoverable: false,
          isHovered: false,
        },
        {
          name: 'Areas',
          path: '/areas',
          hoverable: false,
          isHovered: false,
        },
        {
          name: 'Employees',
          path: '/employees',
          hoverable: false,
          isHovered: false,
        },
        {
          name: 'Contact Us',
          path: '/contact-us',
          hoverable: false,
          isHovered: false,
        },
        {
          name: 'Who we are',
          path: '/who-we-are',
          hoverable: false,
          isHovered: false,
        },
      ],
    }
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
