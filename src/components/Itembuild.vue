<template>
    <div class="mx-auto grid grid-cols-3 w-fit">
        <div class="border" v-for="item in fetchItems" :key="item">
            <!-- <img
                :src="`http://cdn.dota2.com/apps/dota2/images/items/${item.name.substring(
                    5
                )}_lg.png`"
                :alt="item.name.substring(5)"
            /> -->
            <span class="">{{ item.name.substring(5) }}</span>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
const props = defineProps({
    items: Array,
})
const fetchItems = ref([])

onMounted(() => {
    fetchItems.value = []
    props.items.forEach((el) => {
        axios
            .get('/.netlify/functions/db?collection=item&id=' + el)
            .then((res) => {
                fetchItems.value.push(res.data[0])
            })
    })
})
</script>

<style></style>
