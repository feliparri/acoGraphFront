<template>
  <div class="row full-width">
    <div class="full-width">
      <div v-if="data.length===0">
        <q-item-section v-for="n in 6" :key="n" >
          <!-- v-if="data.length===0" -->
          <q-item-label>
            <q-skeleton type="text" height="60px" style="margin-bottom:-28px;"/>
          </q-item-label>
        </q-item-section>
      </div>
      <q-list padding v-if="data.length>0">
        <q-expansion-item
          class="list-header"
          dense
          dense-toggle
          expand-separator
          icon="perm_identity"
          :label="productor.productor"
          v-for="(productor, index) in data"
          :key="index"
        >
          <q-markup-table dense>
            <thead>
              <tr>
                <th class="text-left">variedad</th>
                <th class="text-left">kilos_vac</th>
                <th class="text-left">kilos_exp</th>
                <th class="text-left">kilos_merc</th>
                <th class="text-left">comercial</th>
                <th class="text-left">desecho</th>
                <th class="text-left">precalibre</th>
                <th class="text-left">cajas_exp</th>
                <th class="text-left">cajas_nac</th>
                <th class="text-left">rendimiento</th>
              </tr>
            </thead>
            <tbody v-for="fila in dataInside" :key="fila.index">
              <tr v-if="productor.productor === fila.productor">
                <td>{{ fila.variedad }}</td>
                <td>{{ fila.kilos_vac }}</td>
                <td>{{ fila.kilos_exp }}</td>
                <td>{{ fila.kilos_merc }}</td>
                <td>{{ fila.comercial }}</td>
                <td>{{ fila.desecho }}</td>
                <td>{{ fila.precalibre }}</td>
                <td>{{ fila.cajas_exp }}</td>
                <td>{{ fila.cajas_nac }}</td>
                <td>{{ fila.rendimiento }}%</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'treeProcesos',
  data () {
    return {
      data: [
        {
          productor: 'name'
        }
      ],
      columns: [
        { name: 'productor', field: 'productor', label: 'PRODUCTOR', align: 'left' }
      ],
      dataInside: [
        {
          index: null,
          productor: null,
          variedad: 'name',
          kilos_vac: 159,
          kilos_merc: 6.0
        }
      ],
      columnsInside: [
        { name: 'variedad', field: 'variedad', label: 'variedad timbrada' },
        { name: 'kilos_vac', field: 'kilos_vac', label: 'Kilos Vac' },
        { name: 'kilos_merc', field: 'kilos_merc', label: 'Kilos Exp' }
      ],
      simple: [
        {
          label: 'RESUMEN RENDIMIENTO',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: null
          /*  [
            {
              label: 'Good food (with icon)',
              icon: 'restaurant_menu',
              children: [
                { label: 'Quality ingredients' },
                { label: 'Good recipe' }
              ]
            }
          ] */
        }
      ],
      expanded: ['RESUMEN RENDIMIENTO', 'Good food (with icon)']
    }
  },
  computed: {
    optFilterTwo: function () {
      return this.$store.state.procesos.filtro
    }
  },
  created () {
    this.getResumenRendimiento()
  },
  methods: {
    getResumenRendimiento (dateFrom, dateTo, filterOne, filterTwo) {
      this.data = []
      this.dataInside = []
      const dFrom = new Date(dateFrom)
      const from = date.formatDate(dFrom, 'YYYY-MM-DD')
      const dTo = new Date(dateTo)
      const to = date.formatDate(dTo, 'YYYY-MM-DD')
      // var arrChildren = []
      var arrChildrenData = []
      // console.log(from, to, filterOne, filterTwo)
      this.$store.dispatch('procesos/getReporteProcesos', { from, to, filterOne, filterTwo }).then(response => {
        response.data.forEach((value, index) => {
          value[Object.keys(value)[0]].forEach((value2, index2) => {
            this.data.push({ productor: Object.keys(value)[0] })
            // console.log(value2.productor.includes('166480 - LA CUESTA'))
            // console.log(value2)
            value2.forEach((value3, index3) => {
              arrChildrenData.push(
                {
                  index: Object.keys(value)[0] + '-' + index3,
                  productor: Object.keys(value)[0],
                  variedad: value3.variedad,
                  kilos_vac: this.$options.filters.numberFormat(Math.round(value3.kilos_vac)),
                  kilos_exp: this.$options.filters.numberFormat(Math.round(value3.kilos_exp)),
                  kilos_merc: this.$options.filters.numberFormat(Math.round(value3.kilos_merc)),
                  comercial: this.$options.filters.numberFormat(Math.round(value3.comercial)),
                  desecho: this.$options.filters.numberFormat(Math.round(value3.desecho)),
                  precalibre: this.$options.filters.numberFormat(Math.round(value3.precalibre)),
                  cajas_exp: this.$options.filters.numberFormat(Math.round(value3.cajas_exp)),
                  cajas_nac: this.$options.filters.numberFormat(Math.round(value3.cajas_nac)),
                  rendimiento: this.$options.filters.numberFormat(Math.round(value3.rendimiento * 100))
                }
              )
              console.log(arrChildrenData)
              this.dataInside = arrChildrenData
            })
          })
        })
      })
    }
  },
  filters: {
    buscar: function () {
      var varSearch = 'CUESTA'
      var search = new RegExp(varSearch, '166480 - LA CUESTA')
      console.log(search)
    },
    numberFormat: function (num) {
      return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')
    }
  }
}
</script>

<style>
  .list-header {
    color: white;
    background: #473f5d;
    border-bottom: 1px solid silver;
  }
</style>
