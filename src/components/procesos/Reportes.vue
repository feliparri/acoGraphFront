<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col q-gutter-lg">
        <div class="row q-col-gutter-md">
          <div class="col-12 q-table__title">Proceso por periodo  <q-btn class=" float-right" round color="secondary" icon="search" @click="searchFilter" /></div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" >
            <q-datetime-picker clearable auto-update-value mode="date" label="Desde" v-model="dateFrom" ></q-datetime-picker >
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" >
            <q-datetime-picker clearable auto-update-value mode="date" label="Hasta" v-model="dateTo" ></q-datetime-picker >
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
              label="MOSTRAR/OCULTAR COLUMNAS"
              v-model="visibleColumns"
              multiple
              :disable="select_disable"
              :dense="dense"
              :options-dense="optionsdense"
              :display-value="$q.lang.table.columns"
              emit-value
              map-options
              transition-show="jump-up"
              transition-hide="jump-up"
              :options="columns"
              option-value="name"
              @filter="filterFn"
            />
          </div>
          <!-- <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
            label="FILTRAR POR"
            :options-dense="optionsdense"
            :disable="true"
            v-model="filterOne"
            :options="optFilterOne"
            option-value="name"
            :dense="dense"
            @input="setCmbFilter"
            />
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-select
            label="VALOR"
            :options-dense="optionsdense"
            :disable="true"
            v-model="filterTwo"
            :options="optFilterTwo"
            option-value="name"
            :dense="dense"
            />
          </div> -->
        </div>
      </div>
    </div>
    <div class="q-pa-sm">
      <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        :loading="loading"
        :filter="filter"
        @request="loadTableData"
        binary-state-sort
        :visible-columns="visibleColumns"
        dense
      >
        <template v-slot:top>
        </template>
      </q-table>
      <br>
      <div class="row q-col-gutter-lg">
        <!-- <div class="col-xs-12 col-sm-12 col-md-12">
          <DashProcByPesoMes ref="dashPeso"></DashProcByPesoMes>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
          <dashProcByVariedadRec ref="dashVariedadRec"></dashProcByVariedadRec>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
          <dashProcByVariedadInv ref="dashVariedadInv"></dashProcByVariedadInv>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
// import IEcharts from 'vue-echarts-v3/src/full.js'
// import DashProcByPesoMes from '../../components/procesos/DashProcByPesoMes.vue'
// import dashProcByVariedadRec from '../../components/procesos/dashProcByVariedadRec.vue'
// import dashProcByVariedadInv from '../../components/procesos/dashProcByVariedadInv.vue'
import { date } from 'quasar'

export default {
  name: 'reportes',
  components: {
    // IEcharts
    // DashProcByPesoMes,
    // dashProcByVariedadRec,
    // dashProcByVariedadInv
  },
  props: {},
  data: () => ({
    dateFrom: '',
    dateTo: '',
    visibleColumns: [],
    optFilterOne: ['PRODUCTOR', 'VARIEDAD'],
    filterOne: null,
    filterTwo: null,
    columns: [],
    data: [],
    loading: true,
    dense: false,
    optionsdense: true,
    select_disable: true,
    filter: '',
    pagination: {
      sortBy: null,
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 10
    }
  }),
  created () {
    this.loadTableRows()
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  destroyed () {
  },
  computed: {
    optFilterTwo: function () {
      return this.$store.state.reports.filtro
    },
    now: function () {
      return Date.now()
    }
  },
  methods: {
    searchFilter () {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
      this.setCmbFilterAll(this.filterOne, this.filterTwo, this.dateFrom, this.dateTo)
    },
    setCmbFilter (value) {
      this.$store.dispatch('procesos/setActiveFilter', { value }).then(response => { console.log(response) })
    },
    setCmbFilterAll (filterOne, filterTwo, dateFrom, dateTo) {
      console.log(filterOne, filterTwo, dateFrom, dateTo)
      this.$store.dispatch('procesos/setFiltrarPor', { filterTwo }).then(response => {})
      // this.$refs.dashPeso.getPieChartDataByPesoMes(dateFrom, dateTo, filterOne, filterTwo)
      // this.$refs.dashVariedadRec.loadPieChartDataByCodVariedad(dateFrom, dateTo, filterOne, filterTwo)
      // this.$refs.dashVariedadInv.loadPieChartDataByCodVariedadInv(dateFrom, dateTo, filterOne, filterTwo)
    },
    onRequest (props) {
      // eslint-disable-next-line no-unused-vars
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      // eslint-disable-next-line no-unused-vars
      const filter = props.filter
      console.log(filter)
      this.loading = true
      this.loadTableData(props)
    },
    loadTableData (props) {
      var df = new Date(this.dateFrom)
      var dt = new Date(this.dateTo)
      var dateFrom = date.formatDate(df, 'YYYY-MM-DD')
      var dateTo = date.formatDate(dt, 'YYYY-MM-DD')
      var filterOne = this.filterOne
      var filterTwo = this.filterTwo
      var filter = { from: dateFrom, to: dateTo, filterOne: filterOne, filterTwo: filterTwo }
      this.data = []
      // eslint-disable-next-line no-unused-vars
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      // eslint-disable-next-line no-unused-vars
      this.loading = true
      this.$store.dispatch('procesos/getTableData', {
        page,
        rowsPerPage,
        sortBy,
        descending,
        filter
      }).then(response => {
        /* DATA */
        console.log(response)
        response.data.data.forEach((value, index) => {
          this.data.push(value)
        })
        this.loading = false
        this.select_disable = false
        this.pagination.sortBy = sortBy
        // this.pagination.descending = this.pagination.descending
        this.pagination.page = response.data.current_page
        this.pagination.rowsPerPage = response.data.per_page
        this.pagination.rowsNumber = response.data.total
      })
    },
    loadTableRows () {
      this.loading = true
      this.$store.dispatch('procesos/getTableData', {
        username: this.username,
        password: this.password
      }).then(response => {
        /* COLUMNS */
        Object.keys(response.data.data[0]).forEach((value, index) => {
          this.columns.push({ name: value, align: 'left', label: value, field: value, sortable: true })
        })
        this.visibleColumns.push(
          'idproceso',
          'idTurno',
          'temporada',
          'cod_planta',
          'fecha',
          'semana',
          'estado',
          'linea',
          'tipo',
          'turno',
          'cod_especie',
          'variedad',
          'cod_exportador',
          'frio'
        )
        // this.$options.filter.upperCase(this.visibleColumns)
        this.loading = false
      })
    },
    filterFn (val, update) {
      // console.log(val === '')
      if (val === '') {
        update(() => {
          console.log(update)
          this.options = this.columns

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.columns.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  },
  filters: {
    upperCase: function (texto) {
      return texto.toUpperCase()
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
.q-table__card {
    box-shadow: none;
  }
</style>
