<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    loggedIn () {
      return this.$store.getters['procesos/loggedIn']
    },
    isIdle () {
      return this.$store.state.idleVue.isIdle
    }
  },
  created () {
    // this.$store.dispatch('procesos/setProductor').then(response => {})
    // this.$store.dispatch('procesos/setVariedad').then(response => {})
  },
  onIdle () {
    // console.log('idle')
    if (localStorage.getItem('access_token')) {
      this.$store.dispatch('reports/destroyToken')
        .then(response => {
          this.$router.push({ path: '/login' })
        })
    }
  },
  onActive () {
    // console.log('Hello')
  }
}
</script>
