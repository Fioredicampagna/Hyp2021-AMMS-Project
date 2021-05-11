<template>
  <header class="header">
    <div class="header-content">
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
export default {
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/areas-name`)
    const landmarks = [
      {
        name: 'Home',
        path: '/',
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
    ]

    for (const { name } in data)
      landmarks.push({
        name,
        path: `/${name}`,
        hoverable: false,
        isHovered: false,
      })

    return {
      landmarks,
    }
  },
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
  // methods: {
  //   getLandmarks(menuOptions, areaNames) {
  //     for (const areaName in areaNames)
  //       menuOptions.push({
  //         name: areaName.name,
  //         path: `/${areaName.name}`,
  //         hoverable: false,
  //         isHovered: false,
  //       })

  //     return menuOptions
  //   },
  // },
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
