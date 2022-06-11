<template>
    <h1 class="text-2xl font-bold">Hero : {{ viewHeroes }}</h1>
    <div></div>
    <div class="mt-8">
        <input
            v-model="state.search"
            type="search"
            class="p-2 border border-gray-300 rounded focus:ring-2"
        />
    </div>
    <section>
        <div
            class="m-3 mx-auto grid grid-cols-3 sm:grid-cols-8 lg:grid-cols-12 space-x-0.5 space-y-0.5 w-fit"
        >
            <div v-for="heroes in filtered" :key="heroes.id">
                <img
                    @click="selectHeroes(heroes.name)"
                    class="hover:cursor-pointer"
                    :src="`https://cdn.dota2.com/apps/dota2/images/heroes/${heroes.name.substring(
                        14
                    )}_sb.png`"
                    alt=""
                />
                <span
                    class="hover:cursor-pointer hover:text-blue-500"
                    @click="selectHeroes(heroes.name)"
                >
                    <!-- {{ heroes.name.substring(14) }} -->
                </span>
            </div>
        </div>
        <GoogleLogin :callback="callback" />
    </section>
</template>

<script setup>
import { useMeta } from 'vue-meta'
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

useMeta({
    title: 'Homepage',
})

const callback = (response) => {
    // This callback will be triggered when the user selects or login to
    // his Google account from the popup
    console.log('Handle the response', response)
}

// const router = useRouter()

const store = useStore()

const state = reactive({
    search: null,
    heroes: computed(() => store.getters['dota/getHeroes']),
})

const filtered = computed(() => {
    if (state.search) {
        //console.log('check2a')
        return state.heroes.filter((item) => {
            return state.search
                .toLowerCase()
                .split(' ')
                .every((v) => item.name.toLowerCase().includes(v))
        })
    } else {
        console.log('check2b')
        return state.heroes
    }
})

const viewHeroes = computed(() =>
    store.getters['dota/getPickheroes']
        ? store.getters['dota/getPickheroes'].substring(14)
        : ''
)

function selectHeroes(param) {
    this.state.search = param.substring(14)
    store.dispatch('dota/setPickhero', param)
}

const heroes = ref([])
const storeHeroes = computed(() => store.getters['dota/getHeroes'])

fetchHeroes()
async function fetchHeroes() {
    if (storeHeroes.value.length > 0) {
        return
    }
    const url =
        'api/IEconDOTA2_570/GetHeroes/v1?key=D92ADA35EC43FAF861D0200FEFCAA05B'
    const prdurl = '/.netlify/functions/dota'

    const getHeroes = await axios.get(
        process.env.NODE_ENV === 'development' ? url : prdurl
    )
    heroes.value = getHeroes.data.result.heroes
    store.dispatch('dota/initHeroes', heroes.value)
}
</script>
