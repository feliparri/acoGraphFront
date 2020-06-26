<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashRecepcion></dashRecepcion>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashRecepcion></dashRecepcion>
      </div>
    </div>
  </div>
</template>

<script>
import dashRecepcion from '../components/dashRecepcion.vue'
export default {
  components: {
    dashRecepcion
  }
}
</script>
