import Vue from 'vue'
import Vuex from 'vuex'

import reports from './reports'
import procesos from './procesos'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// export default function (/* { ssrContext } */) {
export default function (store) {
  const Store = new Vuex.Store({
    modules: {
      reports,
      procesos
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./reports'], () => {
      const newReports = require('./reports').default
      const newProcesos = require('./procesos').default
      Store.hotUpdate({
        modules: {
          reports: newReports,
          procesos: newProcesos
        }
      })
    })
  }

  return Store
}
