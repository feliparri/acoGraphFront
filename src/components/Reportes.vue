<template>
  <div class="q-pa-md">
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
        <div class="q-pa-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 q-table__title">Recepciones por periodo  <q-btn class=" float-right" round color="secondary" icon="search" @click="searchFilter" /></div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" >
              <q-datetime-picker clearable auto-update-value mode="date" label="Desde" v-model="dateFrom" ></q-datetime-picker >
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" >
              <q-datetime-picker clearable auto-update-value mode="date" label="Hasta" v-model="dateTo" ></q-datetime-picker >
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-select
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
             <!-- <div class="col-lg-1 col-md-3 gt-sm">
              <q-btn round color="secondary" icon="search" />
            </div> -->
          </div>
        </div>
      </template>
    </q-table>
    <br>
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <DashProdByPesoMes></DashProdByPesoMes>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashProdByVariedad></dashProdByVariedad>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <dashProdByTipo></dashProdByTipo>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
// import IEcharts from 'vue-echarts-v3/src/full.js'
import DashProdByPesoMes from '../components/DashProdByPesoMes.vue'
import dashProdByVariedad from '../components/dashProdByVariedad.vue'
import dashProdByTipo from '../components/dashProdByTipo.vue'
import { date } from 'quasar'

export default {
  name: 'reportes',
  components: {
    // IEcharts
    DashProdByPesoMes,
    dashProdByVariedad,
    dashProdByTipo
  },
  props: {},
  data: () => ({
    dateFrom: '',
    dateTo: '',
    visibleColumns: [],
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
  /* computed: {
    pagesNumber () {
      return 2
    }
  }, */
  methods: {
    searchFilter () {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
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
      console.log(props)
      var df = new Date(this.dateFrom)
      var dt = new Date(this.dateTo)
      var dateFrom = date.formatDate(df, 'YYYY-MM-DD')
      var dateTo = date.formatDate(dt, 'YYYY-MM-DD')
      var filter = { from: dateFrom, to: dateTo }
      this.data = []
      // eslint-disable-next-line no-unused-vars
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      // eslint-disable-next-line no-unused-vars
      this.loading = true
      this.$store.dispatch('reports/getTableData', {
        page,
        rowsPerPage,
        sortBy,
        descending,
        filter
      }).then(response => {
        /* DATA */
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
      this.$store.dispatch('reports/getTableData', {
        username: this.username,
        password: this.password
      }).then(response => {
        /* COLUMNS */
        Object.keys(response.data.data[0]).forEach((value, index) => {
          this.columns.push({ name: value, align: 'left', label: value, field: value, sortable: true })
        })
        this.visibleColumns.push('tipo_Mov', 'Lote', 'fecha_cosecha', 'peso_neto', 'ESTADO')
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
