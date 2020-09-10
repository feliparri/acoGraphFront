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
          :label="productor.obras"
          v-for="(productor, index) in data"
          :key="index"
        >
          <q-markup-table dense>
            <thead>
              <tr>
                <th class="text-left">NRO</th>
                <th class="text-right">INICIO</th>
                <th class="text-right">TERMINO</th>
                <th class="text-right">PROGRAMA</th>
                <th class="text-right">REAL</th>
                <th class="text-right">DESVIO</th>
                <th class="text-right"><q-icon name="swap_vert" /></th>
              </tr>
            </thead>
            <tbody v-for="(fila, index2) in dataInside" :key="index2">
              <tr v-if="productor.obras === fila.estado">
                <td class="text-left" > {{ fila.nro }}</td>
                <td class="text-right" >{{ fila.inicio }}</td>
                <td class="text-right" >{{ fila.termino }}</td>
                <td class="text-right" >{{ fila.programa === null ? '0': fila.programa | numberFormat}}</td>
                <td class="text-right" >{{ fila.real === null ? '0': fila.real | numberFormat}}</td>
                <td class="text-right" >{{ fila.desvio === null ? '0': fila.desvio | numberFormat}}</td>
                <td v-if="fila.desvio > 0"> <q-icon style="font-size: 1.5em;" class="text-primary" name="arrow_upward" /> </td>
                <td v-if="fila.desvio < 0"> <q-icon style="font-size: 1.5em;" class="text-red" name="arrow_downward" /> </td>
              </tr>
            </tbody>
            <!--<tfoot v-for="(filaTotal, index3) in dataInsideTotal" :key="index3 + filaTotal.productor">
              <tr class="total" v-if="productor.productor === filaTotal.productor">
                <td class="text-left"><b>TOTAL</b></td>
                <td class="text-right" >{{ filaTotal.kilos_vac | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.kilos_e xp | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.kilos_merc | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.comercial | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.desecho | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.precalibre | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.cajas_exp | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.cajas_nac | numberFormat}} </td>
                <td class="text-right" ></td>
              </tr>
            </tfoot>-->
          </q-markup-table>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'

export default {
  name: 'treeProcesos',
  data () {
    return {
      data: [
        {
          productor: 'name'
        }
      ],
      columns: [],
      dataInsideTotal: [],
      dataInside: [],
      columnsInside: [],
      simple: [
        {
          label: 'RESUMEN RENDIMIENTO',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: null
        }
      ]
    }
  },
  computed: {
    optFilterTwo: function () {
      return this.$store.state.procesos.filtro
    }
  },
  mounted: function () {
    this.getResumenRendimiento()
  },
  methods: {
    getResumenRendimiento (dateFrom, dateTo, filterOne, filterTwo) {
      dateFrom = null
      dateTo = null
      filterOne = null
      filterTwo = null
      this.data = []
      this.dataInside = []
      const dFrom = new Date(dateFrom)
      const from = date.formatDate(dFrom, 'YYYY-MM-DD')
      const dTo = new Date(dateTo)
      const to = date.formatDate(dTo, 'YYYY-MM-DD')
      // var arrChildren = []
      var arrChildrenData = []
      this.$store.dispatch('procesos/getReporteObras', { from, to, filterOne, filterTwo }).then(response => {
        response.data.forEach((value, index) => {
          value[Object.keys(value)[0]].forEach((value2, index2) => {
            this.data.push({ obras: Object.keys(value)[0] })
            value2.forEach((value3, index3) => {
              arrChildrenData.push(
                {
                  index: Object.keys(value)[0] + '-' + index3,
                  estado: Object.keys(value)[0],
                  nro: value3.nro,
                  inicio: value3.inicio,
                  termino: value3.termino,
                  programa: value3.programa,
                  real: value3.real,
                  desvio: value3.desvio
                  // rendimiento: Number((value3.rendimiento * 100)).toFixed(2)
                }
              )
              this.dataInside = arrChildrenData
            })
            console.log(this.dataInside)
            /* this.dataInsideTotal = _(this.dataInside)
              .groupBy('estado')
              .map((objs, key) => ({
                obras: key,
                kilos_vac: _.sumBy(objs, 'kilos_vac'),
                kilos_exp: _.sumBy(objs, 'kilos_exp'),
                kilos_merc: _.sumBy(objs, 'kilos_merc'),
                comercial: _.sumBy(objs, 'comercial'),
                desecho: _.sumBy(objs, 'desecho'),
                precalibre: _.sumBy(objs, 'precalibre'),
                cajas_exp: _.sumBy(objs, 'cajas_exp'),
                cajas_nac: _.sumBy(objs, 'cajas_nac'),
                rendimiento: _.sumBy(objs, 'rendimiento')
              }))
              .value() */
          })
        })
      })
    }
  },
  filters: {
    buscar: function () {
      /* var varSearch = 'CUESTA'
      var search = new RegExp(varSearch, '166480 - LA CUESTA') */
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
    background: #4C96BA;
    border-bottom: 1px solid silver;
  }
  .total{
    background-color: #e0e0e0;
  }
</style>
