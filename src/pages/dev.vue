<script setup>
import { decodeCredential } from 'vue3-google-login'
import { reactive, computed, ref, onMounted } from 'vue'
import { googleLogout } from 'vue3-google-login'

const callback = (response) => {
    const userData = decodeCredential(response.credential)
    $cookies.set('googleUser', response.credential)
}
const googleUser = reactive({
    data: decodeCredential($cookies.get('googleUser')),
})

onMounted(async () => {
    console.log('#mounted', $cookies.get('googleUser'))
    console.log('cookiesDecode', decodeCredential($cookies.get('googleUser')))
})
</script>
<template>
    <div>{{ userData }}</div>
    <GoogleLogin :callback="callback" auto-login />
</template>
