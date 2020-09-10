<template>
  <div class="q-pa-md dash-card">
    <div class="row items-center">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="row q-col-gutter-none">
          <div class="col-10">
            <div class="my-content">
              <div class="text-h6">Desviación Ejecución</div>
              <div class="text-subtitle2"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="echarts">
          <IEcharts :resizable="true" :option="pie" :loading="false" @ready="onReady" @click="onClick" />
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
  name: 'dashObrasDesviacion',
  components: {
    IEcharts
  }, 
  props: {},
  data: () => ({
    layout: 'comfortable',
    side: 'top',
    loading: false,
    pie: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },
      yAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
      },
      xAxis: {
        type: 'category',
        data: []
      },
      grid: {
        top: 30,
        bottom: 30
      },
      series: [
        {
        name: 'desviacion',
        type: 'bar',
        stack: '',
        label: {
            show: true,
            formatter: '{c} %'
        }
        }
      ]
    }
  }),
  computed: {
    chartLoading: function () {
      return this.$store.state.reports.chartLoading
    }
  },
  created () {
    console.log(this.$router)
    if (this.$router.currentRoute.fullPath === '/obras') {
    }
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
      var labelRight = {
          position: 'right'
      };
      this.$store.dispatch('procesos/getChartAvanceObras').then(response => {
        var stack = []
        var stackVals = []
        stack = _.uniqBy(response.data, 'nro');
        stack.forEach((valueStack, index) => {
          stackVals.push(valueStack.nro)
        });
        var valoresStacked = []
        stackVals.forEach((element, index) => {
          valoresStacked.push({nro: element, data: { index: _.find(response.data, ['nro', element])}})
        });

        /*valoresStacked.data.forEach((element, index) => {
          element.index
        });*/
        console.log(valoresStacked)
        var desvio = []
        var real = []

        valoresStacked.forEach(element => {
            desvio.push(parseFloat(element.data.index.desvio) * 100)
        });
        console.log(desvio)
        this.pie.xAxis.data.push(valoresStacked)
        this.pie.series.push({
            name: 'desviacion',
            type: 'bar',
            stack: '',
            label: {
                show: true,
                formatter: '{c} %'
            },
            data: desvio
        })

        this.pie.xAxis.data = stackVals
      })
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
