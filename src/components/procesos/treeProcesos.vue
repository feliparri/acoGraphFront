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
                <th class="text-right">kilos_vac</th>
                <th class="text-right">kilos_exp</th>
                <th class="text-right">kilos_merc</th>
                <th class="text-right">comercial</th>
                <th class="text-right">desecho</th>
                <th class="text-right">precalibre</th>
                <th class="text-right">cajas_exp</th>
                <th class="text-right">cajas_nac</th>
                <th class="text-right">rendimiento</th>
              </tr>
            </thead>
            <tbody v-for="(fila, index2) in dataInside" :key="index2">
              <tr v-if="productor.productor === fila.productor">
                <td class="text-left" > {{index + 1}} - {{ fila.variedad }}</td>
                <td class="text-right" >{{ fila.kilos_vac | numberFormat}}</td>
                <td class="text-right" >{{ fila.kilos_exp | numberFormat}}</td>
                <td class="text-right" >{{ fila.kilos_merc | numberFormat}}</td>
                <td class="text-right" >{{ fila.comercial | numberFormat}}</td>
                <td class="text-right" >{{ fila.desecho | numberFormat}}</td>
                <td class="text-right" >{{ fila.precalibre | numberFormat}}</td>
                <td class="text-right" >{{ fila.cajas_exp | numberFormat}}</td>
                <td class="text-right" >{{ fila.cajas_nac | numberFormat}}</td>
                <td class="text-right" >{{ fila.rendimiento }}%</td>
              </tr>
            </tbody>
            <tfoot v-for="(filaTotal, index3) in dataInsideTotal" :key="index3 + filaTotal.productor">
              <tr class="total" v-if="productor.productor === filaTotal.productor">
                <td class="text-left"><b>TOTAL</b></td>
                <td class="text-right" >{{ filaTotal.kilos_vac | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.kilos_exp | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.kilos_merc | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.comercial | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.desecho | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.precalibre | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.cajas_exp | numberFormat}}</td>
                <td class="text-right" >{{ filaTotal.cajas_nac | numberFormat}} </td>
                <td class="text-right" ></td>
              </tr>
            </tfoot>
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
                  kilos_vac: (Math.round(Number(value3.kilos_vac))),
                  kilos_exp: (Math.round(Number(value3.kilos_exp))),
                  kilos_merc: (Math.round(Number(value3.kilos_merc))),
                  comercial: (Math.round(Number(value3.comercial))),
                  desecho: (Math.round(Number(value3.desecho))),
                  precalibre: (Math.round(Number(value3.precalibre))),
                  cajas_exp: (Math.round(Number(value3.cajas_exp))),
                  cajas_nac: (Math.round(Number(value3.cajas_nac))),
                  rendimiento: Number((value3.rendimiento * 100)).toFixed(2)
                }
              )
              this.dataInside = arrChildrenData
            })
            this.dataInsideTotal = _(this.dataInside)
              .groupBy('productor')
              .map((objs, key) => ({
                productor: key,
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
              .value()

            // this.dataInsideTotal.push(output)
            /* this.dataInside.forEach((value4, index4) => {
              console.log(Object.keys(value)[0])
              arrChildrenDataTotals.push([])
            }) */
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
  .total{
    background-color: #e0e0e0;
  }
</style>
