<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 col-md-12">
        <DashRecByPesoMes></DashRecByPesoMes>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashRecByVariedadRec></dashRecByVariedadRec>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashRecByVariedadInv></dashRecByVariedadInv>
      </div>
    </div>
  </div>
</template>

<script>
import DashRecByPesoMes from '../components/recepcion/DashRecByPesoMes.vue'
import dashRecByVariedadRec from '../components/recepcion/dashRecByVariedadRec.vue'
import dashRecByVariedadInv from '../components/recepcion/dashRecByVariedadInv.vue'
export default {
  components: {
    dashRecByVariedadRec,
    dashRecByVariedadInv,
    DashRecByPesoMes
  }
}
</script>
