<template>
        <router-view></router-view>
</template>

<script>
    export default{
        name: 'APP',
        mounted() {
            this.socketConnect();
        },
        methods: {
            socketConnect() {
                this.$store.dispatch('SocketConnect');
            }
        }
    }
</script>
