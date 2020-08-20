<template>
  <div class="q-pa-md dash-card">
    <div class="row items-center">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="row q-col-gutter-none">
          <div class="col-10">
            <div class="my-content">
              <div class="text-h6">Resumen Productor Variedad</div>
              <div class="text-subtitle2">Kilos x Variedad en Recepcion</div>
            </div>
          </div>
          <div class="col-2">
            <q-btn class="float-right" flat round dense icon="update" @click="loadPieChartDataByCodVariedad"/>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="echarts">
          <IEcharts :resizable="true" :option="pie" :loading="chartLoading" @ready="onReady" @click="onClick" />
          <!--<button class="btnRandom" @click="doRandom">Random</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import IEcharts from 'vue-echarts-v3/src/full.js'
// import { date } from 'quasar'

export default {
  name: 'dashProcByProductorVariedad',
  components: {
    IEcharts
  },
  props: {},
  data: () => ({
    layout: 'comfortable',
    side: 'left',
    loading: false,
    variedades: [],
    series: [],
    pie: {
      // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['166480 - LA CUESTA', '95841 - ROBERTO TAMM Y CIA.LTDA.']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['BROOKFIELD', 'GALAVAL']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '166480 - LA CUESTA',
          type: 'bar',
          barGap: 0,
          label: { show: true },
          data: [320, 332, 301, 334, 390]
        },
        {
          name: '95841 - ROBERTO TAMM Y CIA.LTDA.',
          type: 'bar',
          barGap: 0,
          label: { show: true },
          data: [320, 332, 301, 334, 390]
        }
      ]
    }
  }),
  computed: {
    chartLoading: function () {
      return this.$store.state.reports.chartLoading
    },
    productores: function () {
      return this.$store.getters['procesos/productores']
    }
  },
  created () {
    this.loadPieChartDataByCodVariedad()
    window.addEventListener('resize', this.myEventHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.myEventHandler)
  },
  mounted () {
  },
  methods: {
    loadPieChartDataByCodVariedad (dateFrom, dateTo, filterOne, filterTwo) {
      this.$store.dispatch('procesos/getChartProcesosRendimiento', { filterOne, filterTwo }).then(response => {
        response.data.forEach((value, index) => {
          // this.pie.legend.data.push(value[0])
          // this.pie.xAxis[0].data.push(value[0])
          // variedad value[0]
          // datos value[1]
          console.log(value[0])
          value[1].forEach((value2, index2) => {
          })
          /* value[1].forEach((value2, index2) => {
            console.log(value2)
          }) */
        })
      })
      this.$store.dispatch('reports/setChartLoading', { loading: false }).then(response => { console.log(response) })
    },
    doRandom () {
      const that = this
      const data = []
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min))
      }
      that.loading = !that.loading
      that.pie.series[0].data = data
    },
    onReady (instance, ECharts) {
    },
    onClick (event, instance, ECharts) {

    }
  },
  filters: {
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
