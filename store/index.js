export const state = () => ({
  landmarks: [],
  breadcrumbs: [],
})

export const mutations = {
  SET_LANDMARKS(state, landmarks) {
    state.landmarks = landmarks
  },
  EXPAND_LANDMARK(state, landmarkIndex) {
    if (state.landmarks[landmarkIndex].hoverable)
      state.landmarks[landmarkIndex].isHovered = true
  },
  COLLAPSE_LANDMARK(state, landmarkIndex) {
    if (state.landmarks[landmarkIndex].hoverable)
      state.landmarks[landmarkIndex].isHovered = false
  },
  EXPAND_SUB_LANDMARK(state, { landmarkIndex, subLandmarkIndex }) {
    if (state.landmarks[landmarkIndex].items[subLandmarkIndex].hoverable)
      state.landmarks[landmarkIndex].items[subLandmarkIndex].isHovered = true
  },
  COLLAPSE_SUB_LANDMARK(state, { landmarkIndex, subLandmarkIndex }) {
    if (state.landmarks[landmarkIndex].items[subLandmarkIndex].hoverable)
      state.landmarks[landmarkIndex].items[subLandmarkIndex].isHovered = false
  },
  SET_BREADCRUMBS(state, breadcrumbs) {
    const breadcrumbsWithDividers = []
    const divider = null

    const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || ''
    breadcrumbs.forEach((element) => {
      // Capitalize the first letter
      const breadcrumb = {
        name: capitalize(element.name),
        path: element.path,
      }

      breadcrumbsWithDividers.push(breadcrumb)
      breadcrumbsWithDividers.push(divider)
    })

    // Pop the last divider
    breadcrumbsWithDividers.pop()
    state.breadcrumbs = breadcrumbsWithDividers
  },
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('storeLandmarks')
  },

  async storeLandmarks({ commit }) {
    // Static landmarks
    const landmarks = [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: 'Areas',
        path: '/areas',
        hoverable: true,
        isHovered: false,
        items: [],
      },
      {
        name: 'Products',
        path: '/products',
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
    const { data } = await this.$axios.get(
      `${process.env.BASE_URL}/api/landmarks`
    )

    data.reverse().forEach(({ name, types }) =>
      landmarks[1].items.push({
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
