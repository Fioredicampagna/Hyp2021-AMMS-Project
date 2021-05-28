export const state = () => ({
  landmarks: [],
  breadcrumbs: [],
})

export const mutations = {
  SET_LANDMARKS(state, landmarks) {
    state.landmarks = landmarks
  },
  EXPAND_LANDMARK(state, landmarkIndex) {
    if (state.landmarks[landmarkIndex].hoverable) {
      state.landmarks[landmarkIndex].isHovered = true
    }
  },
  COLLAPSE_LANDMARK(state, landmarkIndex) {
    if (state.landmarks[landmarkIndex].hoverable) {
      state.landmarks[landmarkIndex].isHovered = false
    }
  },
  SET_BREADCRUMBS(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs
  },
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('storeLandmarks')
  },

  async storeLandmarks({ commit }) {
    const { data } = await this.$axios.get(
      `${process.env.BASE_URL}/api/landmarks`
    )

    // Static landmarks
    const landmarks = [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: 'Areas',
        path: '/areas',
      },
      {
        name: 'Employees',
        path: '/employees',
      },
      {
        name: 'Contact Us',
        path: '/contact-us',
      },
      {
        name: 'Who we are',
        path: '/who-we-are',
      },
    ]

    // Dynamic landmarks
    data.reverse().forEach(({ name, types }) =>
      landmarks.splice(1, 0, {
        name,
        path: `/areas/${name}`,
        hoverable: types.length > 0,
        isHovered: false,
        types,
      })
    )

    commit('SET_LANDMARKS', landmarks)
  },
}
