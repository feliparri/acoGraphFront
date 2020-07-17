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
    >
      <template v-slot:top>
        <div class="q-pa-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 q-table__title">Recepciones por periodo  <q-btn class=" float-right" round color="secondary" icon="search" /></div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" >
              <q-datetime-picker mode="date" label="Desde" v-model="dateFrom"></q-datetime-picker>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" >
              <q-datetime-picker mode="date" label="Hasta" v-model="dateTo"></q-datetime-picker>
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
    onRequest (props) {
      // eslint-disable-next-line no-unused-vars
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      // eslint-disable-next-line no-unused-vars
      const filter = props.filter

      this.loading = true
      this.loadTableData(props)
    },
    dateOptionsB (date) {
      return date >= '2019/02/03' && date <= '2020/12/15'
    },
    loadTableData (props) {
      console.log(props)
      this.data = []
      console.log(props)
      // eslint-disable-next-line no-unused-vars
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      // eslint-disable-next-line no-unused-vars
      const filter = props.filter
      this.loading = true
      this.$store.dispatch('reports/getTableData', {
        page,
        rowsPerPage,
        sortBy,
        descending
      }).then(response => {
        /* DATA */
        response.data.data.forEach((value, index) => {
          this.data.push(value)
        })
        this.loading = false
        this.select_disable = false
        this.pagination.sortBy = sortBy
        this.pagination.descending = !this.pagination.descending
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
        // this.prevPage = response.data.
        // this.nextPage =
      })
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
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
    },
    onScroll ({ to, ref }) {
      console.log('scroll')
      /* const lastIndex = this.data.length - 1

      if (this.loading !== true && this.nextPage < this.lastPage && to === lastIndex) {
        this.loading = true

        setTimeout(() => {
          this.nextPage++
          this.$nextTick(() => {
            ref.refresh()
            this.loading = false
          })
        }, 500)
      } */
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
