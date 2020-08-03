<template>
  <div class="q-pa-md dash-card">
    <div class="row items-center">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="row q-col-gutter-none">
          <div class="col-10">
            <div class="my-content">
              <div class="text-h6">Resumen RECEPCION</div>
              <div class="text-subtitle2">RECEPCION por Variedad </div>
            </div>
          </div>
          <div class="col-2">
            <q-btn class="float-right" flat round dense icon="update" @click="loadPieChartDataByCodVariedad"/>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="echarts">
          <IEcharts :resizable="true" :option="pie" :loading="loading" @ready="onReady" @click="onClick" />
          <!--<button class="btnRandom" @click="doRandom">Random</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import IEcharts from 'vue-echarts-v3/src/full.js'
export default {
  name: 'dashProdByVariedad',
  components: {
    IEcharts
  },
  props: {},
  data: () => ({
    layout: 'comfortable',
    side: 'left',
    loading: false,
    pie: {
      /* tooltip: {},
      xAxis: {
        data: [
          'Shirt',
          'Sweater',
          'Chiffon Shirt',
          'Pants',
          'High Heels',
          'Socks'
        ]
      },
      yAxis: {}, */
      title: {
        text: '',
        x: 'left',
        textStyle: { fontSize: '11' }
      },
      tooltip: {
        trigger: 'item',
        // formatter: '{a} <br/>{b} : {c} ({d}%)'
        formatter: '{b} <br/>{c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: []

        // selected: data.selected
      },
      series: [
        {
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'left'
          },
          radius: ['30%', '70%'],
          emphasis: {
            label: {
              show: true,
              fontSize: '10',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          name: 'PR X ESP',
          type: 'pie',
          data: []
        }
      ]
    }
  }),
  created () {
    window.addEventListener('resize', this.myEventHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.myEventHandler)
  },
  mounted () {
    this.loadPieChartDataByCodVariedad()
  },
  methods: {
    loadPieChartDataByCodVariedad () {
      this.$store.dispatch('reports/getPieChartDataByCodVariedad').then(response => {
        /* DATA */
        this.pie.series[0].data = []
        response.data.forEach((value, index) => {
          this.pie.series[0].data.push({ value: value.count, name: value.cod_variedad })
          this.pie.legend.data.push(value.cod_variedad)
        })
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
      // console.log(instance, ECharts)
    },
    onClick (event, instance, ECharts) {
      // console.log(arguments)
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
