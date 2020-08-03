<template>
<div class="q-pa-md row justify-center">
    <q-card class="my-card">
      <q-card-section>
        <q-input v-model="text" label="Exportador *" :dense="dense" />
        <q-input v-model="text" label="Productor" :dense="dense" />
        <q-radio v-model="text" label="Todos" :dense="dense" />
        <q-radio v-model="text" label="Manzana" :dense="dense" />
        <q-radio v-model="text" label="Kiwi" :dense="dense" />
        <q-select v-model="model" :options="options" label="Standard" :dense="dense" multiple />
      </q-card-section>
    </q-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      options: [
        'todos',
        'febrero'
      ]
    }
  }
}

</script>

<style>

</style>
