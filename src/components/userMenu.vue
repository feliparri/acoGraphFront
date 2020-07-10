<template>
    <div>
        <q-btn-dropdown color="primary" label="FELIPE HUERTA">
            <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                        <q-item-label>Configuracion</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                        <q-item-label>Salir</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                   <q-toggle v-model="drawerState" />
                </q-item>
            </q-list>
        </q-btn-dropdown>
    </div>
</template>

<script type="text/babel">
export default {
  name: 'userMenu',
  props: {},
  data: () => ({
  }),
  created () {
  },
  destroyed () {
  },
  methods: {
    onItemClick () {
      console.log('asdasd')
    }
  },
  computed: {
    drawerState: {
      get () {
        return this.$store.state.reports.drawerState
      },
      set (val) {
        this.$store.commit('reports/updateDrawerState', val)
      }
    }
  }
}

</script>

<style scoped>

</style>
