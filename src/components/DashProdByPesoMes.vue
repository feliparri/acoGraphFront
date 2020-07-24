<template>
  <div class="q-pa-md dash-card">
    <div class="row items-center">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="row q-col-gutter-none">
          <div class="col-10">
            <div class="my-content">
              <div class="text-h6">Resumen Produccion</div>
              <div class="text-subtitle2">Peso prod x Mes</div>
            </div>
          </div>
          <div class="col-2">
            <q-btn class="float-right" flat round dense icon="update" @click="getPieChartDataByPesoMes"/>
          </div>
        </div>
      </div>
      <!-- <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5 text-center">
        <div class="row q-col-gutter-none">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div style="color:#846461;" class="text-h7">Salida Total</div>
            <div style="color:#846461;" class="text-subtitle2">$40.000.000</div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div style="color:#846461;" class="text-h7">Ultima Salida</div>
            <div style="color:#846461;" class="text-subtitle2">$6.000.000</div>
          </div>
        </div>
      </div>
      <q-separator class="lt-md" inset />
      <br><br>
      -->
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
export default {
  name: 'DashProdByPesoMes',
  components: {
    IEcharts
  },
  props: {},
  data: () => ({
    layout: 'comfortable',
    side: 'right',
    loading: false,
    bar: {
      title: {
        text: ''
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true
        }
      },
      grid: {
        left: '80px',
        right: '15px'
      },
      yAxis: {
        type: 'value',
        data: []
      },
      series: [
        {
          name: '',
          type: 'bar',
          showBackground: true,
          barWidth: '40%',
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
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
    this.getPieChartDataByPesoMes()
  },
  methods: {
    getPieChartDataByPesoMes () {
      this.$store.dispatch('reports/getPieChartDataByPesoMes').then(response => {
        /* DATA */
        this.bar.series[0].data = []
        this.bar.xAxis.data = []
        response.data.forEach((value, index) => {
          this.bar.series[0].data.push(value.peso)
          this.bar.xAxis.data.push(value.mes)
        })
      })
      console.log()
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
