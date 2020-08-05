<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 col-md-12">
        <DashRecByPesoMes></DashRecByPesoMes>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashRecByTipo></dashRecByTipo>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashRecByVariedad></dashRecByVariedad>
      </div>
    </div>
  </div>
</template>

<script>
import DashRecByPesoMes from '../components/DashRecByPesoMes.vue'
import dashRecByTipo from '../components/dashRecByTipo.vue'
import dashRecByVariedad from '../components/dashRecByVariedad.vue'
export default {
  components: {
    dashRecByTipo,
    dashRecByVariedad,
    DashRecByPesoMes
  }
}
</script>
