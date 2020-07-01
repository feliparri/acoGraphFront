<template>
  <div class="q-pa-md dash-card">
    <div class="row items-center">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5">
        <div class="row q-col-gutter-none">
          <div class="col-12">
            <div class="my-content">
              <div class="text-h6">Resumen Produccion</div>
              <div class="text-subtitle2">Rinconada</div>
            </div>
          </div>
        </div>
      </div>
      <q-separator inset />
      <br>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5 text-center">
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

      <div class="col-xs-12 col-sm-12 col-md-4 col-lg-5">
        <div class="echarts">
          <IEcharts :resizable="true" :option="pie" :loading="loading" @ready="onReady" @click="onClick" />
          <!--<button class="btnRandom" @click="doRandom">Random</button>-->
        </div>
        <q-btn flat round dense icon="plus" />
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import IEcharts from 'vue-echarts-v3/src/full.js'
export default {
  name: 'dashRecepcion',
  components: {
    IEcharts
  },
  props: {},
  data: () => ({
    layout: 'comfortable',
    side: 'right',
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
        text: 'PROD. X CALIBRE',
        x: 'center',
        textStyle: { fontSize: '11' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: 'Sales',
          type: 'pie',
          data: [
            // 5, 20, 36, 10, 10, 20
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
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
  methods: {
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
      that.pie.series[0].data = data
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
