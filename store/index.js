new Vuex.Store({
    state: {
        landmarks: null
    },
    mutations: {
      SET_LANDMARKS(state, content) {
          state.landmarks = content
      }
    },
    modules: {
    },
    actions: {
        async nuxtServerInit({ commit }) {
          const { body } = await fetch(`${process.env.BASE_URL}/api/areas-name`).then(response => response.json())
          commit('SET_LANDMARKS', body)
        }
      }
  })
  