<template>
    <h1 class="text-2xl font-bold">Hero : {{ viewHeroes }}</h1>
    <div>
        <template v-for="item in displayList.data" :key="item._id">
            {{ item.build_name }}
            <Itembuild :items="item.item_list" />
        </template>
    </div>
    <div class="mt-8">
        <input
            v-model="state.search"
            type="search"
            class="p-2 border border-gray-300 rounded focus:ring-2"
        />
    </div>
    <section>
        <div
            class="m-3 mx-auto grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 space-x-0.5 space-y-0.5"
        >
            <div class="w-full" v-for="heroes in filtered" :key="heroes.id">
                <!-- <img
                    @click="selectHeroes(heroes.name)"
                    class="hover:cursor-pointer"
                    :src="`https://cdn.dota2.com/apps/dota2/images/heroes/${heroes.name.substring(
                        14
                    )}_sb.png`"
                    alt=""
                /> -->
                <div
                    class="rounded border hover:cursor-pointer hover:text-blue-500"
                    @click="selectHeroes(heroes.name)"
                >
                    {{ heroes.name.substring(14) }}
                </div>
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
import Itembuild from '../components/Itembuild.vue'

useMeta({
    title: 'Homepage',
})

const callback = (response) => {
    console.log('Handle the response', response)
}

// const router = useRouter()

const displayList = ref([])

const store = useStore()

const state = reactive({
    search: null,
    heroes: computed(() => store.getters['dota/getHeroes']),
})

const filtered = computed(() => {
    if (state.search) {
        return state.heroes.filter((item) => {
            return state.search
                .toLowerCase()
                .split(' ')
                .every((v) => item.name.toLowerCase().includes(v))
        })
    } else {
        return state.heroes
    }
})

const viewHeroes = computed(() =>
    store.getters['dota/getPickheroes']
        ? store.getters['dota/getPickheroes'].substring(14)
        : ''
)

function selectHeroes(param) {
    // this.state.search = param.substring(14)
    store.dispatch('dota/setPickhero', param)
    fetchBuild(param.substring(14))
}
async function fetchBuild(param) {
    displayList.value = await axios.get(
        '/.netlify/functions/db?collection=build&hero=' + param
    )
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
        prdurl
        // process.env.NODE_ENV === 'development' ? url : prdurl
    )
    heroes.value = getHeroes.data.result.heroes
    store.dispatch('dota/initHeroes', heroes.value)
}
</script>
