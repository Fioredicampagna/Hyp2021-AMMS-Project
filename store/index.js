export const state = () => ({
  landmarks: [],
})

export const mutations = {
  SET_LANDMARKS(state, content) {
    state.landmarks = content
  },
  HOVER_LANDMARK(state, index) {
    state.landmarks[index].isHovered = !state.landmarks[index].isHovered
  },
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('storeLandmarksFunc')
  },

  async storeLandmarksFunc({ commit }) {
    const { data } = await this.$axios.get(
      `${process.env.BASE_URL}/api/areas-name`
    )

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

    data.reverse().forEach(({ name }) =>
      landmarks.splice(1, 0, {
        name,
        path: `/${name}`,
        hoverable: false,
        isHovered: false,
      })
    )

    commit('SET_LANDMARKS', landmarks)
  },
}
