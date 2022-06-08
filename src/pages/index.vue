<template>
    <h1 class="text-2xl font-bold">Hero : {{ viewHeroes }}</h1>
    <div></div>
    <div class="mt-8">
        <input
            type="text"
            class="p-2 border border-gray-300 rounded focus:ring-2"
        />
    </div>
    <section>
        <div
            class="m-3 mx-auto grid grid-cols-3 sm:grid-cols-8 lg:grid-cols-12 space-x-0.5 space-y-0.5 w-fit"
        >
            <div v-for="heroes in storeHeroes.slice(0, 20)" :key="heroes.id">
                <!-- <img
                    :src="`https://cdn.dota2.com/apps/dota2/images/heroes/${heroes.name.substring(
                        14
                    )}_sb.png`"
                    alt=""
                /> -->
                <span
                    class="hover:cursor-pointer hover:text-blue-500"
                    @click="selectHeroes(heroes.name)"
                >
                    {{ heroes.id }}
                </span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useMeta } from 'vue-meta'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

useMeta({
    title: 'Homepage',
})

// const router = useRouter()

const store = useStore()

const viewHeroes = computed(() =>
    store.getters['dota/getPickheroes']
        ? store.getters['dota/getPickheroes'].substring(14)
        : ''
)

function selectHeroes(param) {
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
        'IEconDOTA2_570/GetHeroes/v1?key=D92ADA35EC43FAF861D0200FEFCAA05B'
    const getHeroes = await axios.get(`/api/${url}`)
    heroes.value = getHeroes.data.result.heroes
    store.dispatch('dota/initHeroes', heroes.value)
}
</script>
