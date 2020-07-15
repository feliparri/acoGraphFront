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
      return this.$store.getters.loggedIn
    }
  }
}
</script>
