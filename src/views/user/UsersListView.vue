<template>
    <HeaderLayout />
    <UsersListLayout />
    <FooterLayout />
</template>

<script>
import HeaderLayout from '@/components/templates/HeaderLayout.vue'
import FooterLayout from '@/components/templates/FooterLayout.vue'
import UsersListLayout from '@/components/user/UsersListLayout.vue'

export default {
    name: "UsersListView",
    components: {
        HeaderLayout,
        FooterLayout,
        UsersListLayout
    }
}
</script>

<style>
</style>