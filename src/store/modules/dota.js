const state = () => ({
    items: [],
    heroes: [],
})

const getters = {
    getHeroes: (state) => {
        return state.heroes
    },
}

const actions = {
    initHeroes({ commit }, data) {
        commit('SET_HERO', data)
    },
}

const mutations = {
    SET_HERO(state, payload) {
        state.heroes = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
