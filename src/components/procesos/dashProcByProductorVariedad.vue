<template>
  <div class="q-pa-md dash-card">
    <div class="row items-center">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="row q-col-gutter-none">
          <div class="col-10">
            <div class="my-content">
              <div class="text-h6">Resumen Productor Variedad</div>
              <div class="text-subtitle2">% Kilos x Variedad en Recepcion</div>
            </div>
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
import _ from 'lodash'

export default {
  name: 'dashProcByProductorVariedad',
  components: {
    IEcharts
  },
  props: {},
  data: () => ({
    layout: 'comfortable',
    side: 'top',
    loading: false,
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
        data: ['166480 - LA CUESTA', '95841 - ROBERTO TAMM Y CIA.LTDA.'],
        type: 'scroll',
        bottom: '75%'
      },
      toolbox: {
        showTitle: false,
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          mark: { show: true },
          // dataView: { show: true, readOnly: false, title: 'Exportar', lang: ['Vista de Tabla', 'Cerrar', 'Refrescar'] },
          dataZoom: { show: true, title: 'Zoom' },
          magicType: {
            show: true,
            type: ['line'],
            title: {
              line: 'Line',
              bar: 'Bar',
              stack: 'Stack'
            }
          },
          restore: { show: true, title: 'Restaurar' },
          saveAsImage: { show: true, title: 'Guardar Img' }
        }
      },
      xAxis: [
        {
          textStyle: {
            align: 'left'
          },
          position: 'bottom',
          type: 'category',
          nameRotate: 90,
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          data: ['BROOKFIELD', 'GALAVAL']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: []
    }
  }),
  computed: {
    chartLoading: function () {
      return this.$store.state.reports.chartLoading
    },
    productores: function () {
      return this.$store.getters['procesos/productores']
    },
    variedades: function () {
      return this.$store.getters['procesos/variedades']
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
      this.$store.dispatch('reports/setChartLoading', { loading: true }).then(response => { })
      this.pie.series = []
      this.pie.xAxis[0].data = []
      this.pie.legend.data = this.$store.getters['procesos/productores']
      _.pull(this.pie.legend.data, 'todo') // ['a', 'c', 'd']
      this.$store.dispatch('procesos/getChartProcesosRendimiento', { filterOne, filterTwo }).then(response => {
        response.data.forEach((variedades, indexVariedades) => {
          this.pie.xAxis[0].data.push(variedades[0])
        })
        var dataProd = []
        var productores = this.$store.getters['procesos/productores']
        response.data.forEach((variedades, index1) => {
          productores.forEach((productor, index) => {
            variedades[1].forEach((productor2, index) => {
              console.log(productor2[0].productor)
              if (productor2[0].productor === productor) {
                dataProd.push([productor2[0].productor, {
                  data: productor2[0].rendimiento,
                  variedad: productor2[0].variedad['Variedad Timbrada']
                }])
              }
            })
          })
        })
        productores.forEach((productor, index) => {
          // var data = _.filter(dataProd, '166480 - LA CUESTA').map(v => v.data)
          var stackedData = []
          dataProd.forEach((data, index) => {
            if (data[0] === productor) {
              stackedData.push(Number(this.$options.filters.numberFormat(data[1].data * 100)).toFixed(2))
            }
          })
          this.pie.series.push(
            {
              name: productor,
              type: 'bar',
              barGap: 0,
              stack: 'x',
              label: { show: false },
              data: stackedData
            }
          )
        })
      })
      this.$store.dispatch('reports/setChartLoading', { loading: false }).then(response => { })
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
    buscar: function () {
      /* var varSearch = 'CUESTA'
      var search = new RegExp(varSearch, '166480 - LA CUESTA')
       */
    },
    numberFormat: function (num) {
      return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')
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
  height:100%;
  background-color: #ffffff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
</style>
