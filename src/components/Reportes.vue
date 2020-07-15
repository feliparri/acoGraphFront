<template>
  <div class="q-pa-md">
    <q-table
      dense
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top>
        <div class="col-6 q-table__title">Recepciones por periodo</div>
        <div class="col-3">
          <q-datetime-picker mode="date" label="Desde" v-model="date"></q-datetime-picker>
        </div>
        <div class="col-3">
          <q-datetime-picker mode="date" label="Hasta" v-model="date"></q-datetime-picker>
        </div>
        <q-space />
        <q-select
          v-model="visibleColumns"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />
      </template>

    </q-table>
    <br>
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashRecepcion></dashRecepcion>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashProduccion></dashProduccion>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
// import IEcharts from 'vue-echarts-v3/src/full.js'
import dashRecepcion from '../components/dashRecepcion.vue'
import dashProduccion from '../components/dashProduccion.vue'
export default {
  name: 'reportes',
  components: {
    // IEcharts
    dashRecepcion,
    dashProduccion
  },
  props: {},
  data: () => ({
    date: '',
    visibleColumns: ['calories', 'desc', 'protein', 'sodium', 'iron'],
    columns: [],
    data: []
  }),
  created () {
    this.loadTableData()
  },
  destroyed () {
  },
  methods: {
    dateOptionsB (date) {
      return date >= '2019/02/03' && date <= '2020/12/15'
    },
    loadTableData () {
      this.loading = true
      this.$store.dispatch('reports/getTableData', {
        username: this.username,
        password: this.password
      }).then(response => {
        // console.log(response)
        // eslint-disable-next-line no-undef
        /* DATA */
        response.data.data.forEach((value, index) => {
          this.data.push(value)
          console.log(value)
          // console.log(index)
        })
        /* COLUMNS */
        Object.keys(response.data.data[0]).forEach((value, index) => {
          this.columns.push({ name: value, label: value, field: value, sortable: true })
        })
        /* { name: 'Calle', label: 'Calle', field: 'Calle', sortable: true }, */
        // console.log(this.data)
        /*
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        }
        */
        this.loading = false
        // this.$router.push('/')
      })
    }
  }
}

</script>

<style scoped>
.dash-card{
  height:90%;
  background-color: #ffffff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
</style>
