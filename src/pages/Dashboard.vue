<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <DashProdByPesoMes></DashProdByPesoMes>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashProdByTipo></dashProdByTipo>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashProdByVariedad></dashProdByVariedad>
      </div>
    </div>
  </div>
</template>

<script>
import DashProdByPesoMes from '../components/DashProdByPesoMes.vue'
import dashProdByTipo from '../components/dashProdByTipo.vue'
import dashProdByVariedad from '../components/dashProdByVariedad.vue'
export default {
  components: {
    dashProdByTipo,
    dashProdByVariedad,
    DashProdByPesoMes
  }
}
</script>
