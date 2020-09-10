<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="navbar-background" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>ACO - AVANCE DE OBRAS
        </q-toolbar-title>

        <div>
          <userMenu></userMenu>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="sidebar-background"
    >
      <q-list>
        <q-item-label
          header
          class="text-white-8"
        >
          <img width="90%" src="../assets/aco_logo.png" alt="">
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          link.disable
          v-show="!link.disable"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import userMenu from '../components/userMenu.vue'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink,
    userMenu
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Procesos',
          caption: '',
          icon: 'fiber_manual_record',
          link: '/obras',
          disable: false
        }
      ]
    }
  }
}
</script>
<style>
.sidebar-background{
  background-color: #4C96BA;
  color: black;
  border-right: 1px solid #65a3b8 !important;
}
.navbar-background{
  background-color: #ffffff;
  color:#7a777e;
}
.q-toolbar__title{
  font-size:14px !important;
}
.q-drawer{
  border-right: 1px solid #473f5d !important;
}
</style>
