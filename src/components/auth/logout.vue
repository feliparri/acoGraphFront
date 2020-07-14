<template>
  <div>
    loged out
  </div>
</template>

<script>
export default {
  created () {
    /* this.$store.dispatch('destroyToken')
      .then(response => {
        this.$router.push({ path: '/login' })
      })
  } */
    this.$store.dispatch('reports/destroyToken')
      .then(response => {
        this.$router.push({ path: '/login' })
      })
  }
}
</script>

<style>

</style>
