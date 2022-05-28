import { createStore, createLogger } from 'vuex'

import user from './modules/user'
import dota from './modules/dota'

const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
    modules: {
        user,
        dota,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})

export default store
