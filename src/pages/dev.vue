<script setup>
import { decodeCredential } from 'vue3-google-login'
import { reactive, computed, ref, onMounted } from 'vue'
const callback = (response) => {
    const userData = decodeCredential(response.credential)

    console.log('Handle the userData', userData)
}
const googleUser = reactive({
    data: null,
})

onMounted(() => {
    console.log(decodeCredential(credential))
})
</script>
<template>
    <div>{{ userData }}</div>
    <GoogleLogin :callback="callback" />
</template>
