<template>
    <h1 class="text-2xl font-bold">Welcome to Vue3Stackter, {{ name }}</h1>

    <div class="mt-8">
        <input
            v-model="newName"
            type="text"
            class="p-2 border border-gray-300 rounded focus:ring-2"
        />
        <v-button
            :class="{ 'pointer-events-none opacity-40': !newName }"
            @click.native="saveName"
        >
            Save
        </v-button>
    </div>
    <!-- <section>
        <div class="grid grid-cols-6 gap-0">
            <div v-for="h in heroes.slice(0, 10)" :key="h.id">
                <img
                    :src="`http://cdn.dota2.com/apps/dota2/images/heroes/${h.name.toLowerCase()}_sb.png`"
                    alt=""
                />
            </div>
        </div>
    </section> -->
    <section>
        <div class="m-3 flex justify-center space-x-0.5 w-full">
            <div v-for="heroes in storeHeroes.slice(0, 20)" :key="heroes.id">
                <span>{{ heroes.name }}</span>
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

const router = useRouter()

const store = useStore()

// name
// const name = computed(() => store.state.user.name)
const name = computed(() => store.getters['user/nameUppercased'])
const newName = ref('')
function saveName() {
    if (newName.value === '') {
        return
    }
    store.dispatch('user/saveName', newName.value)
    newName.value = ''
    router.push(`/about/${name.value}`)
}

const heroes = ref([])
const storeHeroes = computed(() => store.getters['dota/getHeroes'])

fetchHeroes()
async function fetchHeroes() {
    if (storeHeroes.value.length > 0) {
        return
    }
    console.log('FEATCHING HEROES')
    try {
        const data = await axios.get(
            'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=D92ADA35EC43FAF861D0200FEFCAA05B'
        )
        heroes.value = data.data
    } catch (error) {
        console.log(error)
    }

    store.dispatch('dota/initHeroes', heroes.value)
}
</script>
