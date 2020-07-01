<template>
  <q-item
    class="sidebarStyle"
    :disable="disable"
    clickable
    tag="a"
    target="_self"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="sidebarStyle">{{ title }}</q-item-label>
      <q-item-label class="sidebarStyle" caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    }

  }
}
</script>

<style lang="stylus" scoped>
.sidebarStyle{
  color:white;
  text-text-decoration:none !important;
}
</style>
