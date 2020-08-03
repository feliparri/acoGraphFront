<template>
  <div class="q-pa-md dash-card">
    <div class="row items-center">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="row q-col-gutter-none">
          <div class="col-10">
            <div class="my-content">
              <div class="text-h6">Resumen RECEPCION</div>
              <div class="text-subtitle2">KILOS RECEPCIONADOS</div>
            </div>
          </div>
          <div class="col-2">
            <q-btn class="float-right" flat round dense icon="update" @click="getPieChartDataByPesoMes"/>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-1 col-lg-1">
      </div>
      <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">
        <div class="echarts">
          <IEcharts :resizable="true" :option="bar" :loading="loading" @ready="onReady" @click="onClick" />
          <!--<button class="btnRandom" @click="doRandom">Random</button>-->
        </div>
        <q-btn flat round dense icon="plus" @click="doRandom"/>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-1 col-lg-1">
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import IEcharts from 'vue-echarts-v3/src/full.js'
import { date } from 'quasar'

export default {
  name: 'DashRecByPesoMes',
  components: {
    IEcharts
  },
  props: {},
  data: () => ({
    layout: 'comfortable',
    side: 'right',
    loading: true,
    bar: {
    }
  }),
  created () {
    console.log('created')
    this.getPieChartDataByPesoMes()
    this.setProductores()
    this.setVariedad()
    window.addEventListener('resize', this.myEventHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.myEventHandler)
  },
  mounted () {
    console.log('mounted')
  },
  methods: {
    setProductores () {
      this.$store.dispatch('reports/setProductor').then(response => { console.log(response) })
    },
    setVariedad () {
      this.$store.dispatch('reports/setVariedad').then(response => { console.log(response) })
    },
    getPieChartDataByPesoMes (dateFrom, dateTo, filterOne, filterTwo) {
      this.loading = true
      const dFrom = new Date(dateFrom)
      const from = date.formatDate(dFrom, 'YYYY-MM-DD')
      const dTo = new Date(dateTo)
      const to = date.formatDate(dTo, 'YYYY-MM-DD')
      this.$store.dispatch('reports/getPieChartDataByPesoMes', { from, to, filterOne, filterTwo }).then(response => {
        const dimensiones = ['PRODUCTOR', 'KILOS_RECEPCIONADOS', 'KILOS_INVENTARIO']
        const ArrProductor = []
        const productor = []
        const xAxisData = []
        response.data.forEach((value, index) => {
          console.log(this.$store.state.reports.filtrarPor.filterTwo === 'todo')
          if (this.$store.state.reports.filtrarPor.filterTwo === 'todo') {
            ArrProductor.push({
              KILOS_INVENTARIO: value.KILOS_INVENTARIO,
              KILOS_RECEPCIONADOS: value.KILOS_RECEPCIONADOS,
              PRODUCTOR: this.$options.filters.shortName(value.PRODUCTOR)
            })
          } else {
            ArrProductor.push({
              KILOS_INVENTARIO: value.KILOS_INVENTARIO,
              KILOS_RECEPCIONADOS: value.KILOS_RECEPCIONADOS,
              PRODUCTOR: this.$options.filters.shortName(value.PRODUCTOR)
            })
            /* console.log(this.$store.state.reports.filtrarPor.filterTwo)
            if (this.$store.state.reports.filtrarPor.filterTwo === this.$options.filters.shortName(value.PRODUCTOR)) {
              ArrProductor.push({
                KILOS_INVENTARIO: value.KILOS_INVENTARIO,
                KILOS_RECEPCIONADOS: value.KILOS_RECEPCIONADOS,
                PRODUCTOR: this.$options.filters.shortName(value.PRODUCTOR)
              })
            } */
          }
        })
        console.log(ArrProductor)
        ArrProductor.forEach((value, index) => {
          productor.push(value)
          xAxisData.push(value.PRODUCTOR)
          console.log(value)
        })
        this.bar = {
          legend: {},
          tooltip: {},
          dataset: {
            dimensions: dimensiones,
            source: productor
          },
          xAxis: { type: 'category', data: xAxisData },
          yAxis: [{ type: 'value' }],
          series: [
            { type: 'bar' },
            { type: 'bar' }
          ]
        }
        this.loading = false
      })
    },
    myEventHandler (e) {
    // your code for handling resize...
      console.log(e)
      // this.doRandom()
    },
    doRandom () {
      const that = this
      const data = []
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min))
      }
      that.loading = !that.loading
      that.bar.series[0].data = data
    },
    onReady (instance, ECharts) {
      console.log(instance, ECharts)
    },
    onClick (event, instance, ECharts) {
      console.log(arguments)
    }
  },
  filters: {
    shortName: function (texto) {
      var spltext = texto.split('-')
      var txt = spltext[1].substring(0, 15).trim()
      return txt.substring(0, 10)
    }
  }
}

</script>

<style scoped>
.echarts {
  width: 100%;
  height: 200px;
  float:left;
}
.avatarRepo{
  background-color:#f4f4f4;
  color:#7f7c88;
}
.dash-card{
  height:90%;
  background-color: #ffffff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
</style>
