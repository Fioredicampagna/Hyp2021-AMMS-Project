export const state = () => ({
  landmarks: [],
})

export const mutations = {
  SET_LANDMARKS(state, content) {
    state.landmarks = content
  },
  EXPAND_LANDMARK(state, landmarkIndex) {
    if (state.landmarks[landmarkIndex].hoverable)
      state.landmarks[landmarkIndex].isHovered = true
  },
  COLLAPSE_LANDMARK(state, landmarkIndex) {
    if (state.landmarks[landmarkIndex].hoverable)
      state.landmarks[landmarkIndex].isHovered = false
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
        path: `/areas/${name}`,
        hoverable: false,
        isHovered: false,
      })
    )

    commit('SET_LANDMARKS', landmarks)
  },
}
