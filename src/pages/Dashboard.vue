<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 col-md-12">
        <q-list>
          <q-expansion-item default-opened icon="assessment" header-class="bg-primary text-white" expand-icon-class="text-white" label="RECEPCION" caption="">
            <q-separator />
            <q-card>
              <q-card-section>
                <div class="row q-col-gutter-lg">
                  <div class="col-xs-12 col-sm-12 col-md-12">
                    <DashRecByPesoMes></DashRecByPesoMes>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6">
                    <DashRecByVariedadRec></DashRecByVariedadRec>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6">
                    <DashRecByVariedadInv></DashRecByVariedadInv>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 dash-card">
        <q-list>
          <q-expansion-item default-opened icon="assessment" header-class="bg-primary text-white" expand-icon-class="text-white" label="PROCESOS" caption="">
            <q-separator />
            <q-card>
              <q-card-section>
                <DashProcByProductorVariedad></DashProcByProductorVariedad>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import DashRecByPesoMes from '../components/recepcion/DashRecByPesoMes.vue'
import DashRecByVariedadRec from '../components/recepcion/dashRecByVariedadRec.vue'
import DashRecByVariedadInv from '../components/recepcion/dashRecByVariedadInv.vue'

import DashProcByProductorVariedad from '../components/procesos/dashProcByProductorVariedad.vue'

export default {
  components: {
    DashRecByVariedadRec,
    DashRecByVariedadInv,
    DashRecByPesoMes,
    DashProcByProductorVariedad
  },
  data: () => ({
    showDashProcByProductorVariedad: true
  }),
  created () {
  },
  methods: {
  }
}
</script>
