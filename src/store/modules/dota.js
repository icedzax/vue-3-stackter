const state = () => ({
    items: [],
    heroes: [],
    pickheroes: null,
})

const getters = {
    getHeroes: (state) => {
        return state.heroes
    },
    getPickheroes: (state) => {
        return state.pickheroes
    },
}

const actions = {
    initHeroes({ commit }, data) {
        commit('SET_HERO', data)
    },
    setPickhero({ commit }, data) {
        commit('SET_PICKHERO', data)
    },
}

const mutations = {
    SET_HERO(state, payload) {
        state.heroes = payload
    },
    SET_PICKHERO(state, payload) {
        state.pickheroes = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
