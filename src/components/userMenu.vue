<template>
    <div>
        <q-btn-dropdown color="primary" :label="name">
            <q-list>
                <q-item clickable v-close-popup>
                    <q-item-section>
                        <q-item-label class="disabled">Configuracion</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="logout">
                    <q-item-section>
                        <q-item-label>Salir</q-item-label>
                    </q-item-section>
                </q-item>
                <!-- <q-item>
                   <q-toggle v-model="drawerState" />
                </q-item> -->
            </q-list>
        </q-btn-dropdown>
    </div>
</template>

<script type="text/babel">
export default {
  name: 'userMenu',
  props: {},
  data: () => ({
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email')
  }),
  created () {
  },
  destroyed () {
  },
  methods: {
    logout () {
      this.$store.dispatch('reports/destroyToken')
        .then(response => {
          this.$router.push('/login')
        })
    }
  }
}

</script>

<style scoped>

</style>
