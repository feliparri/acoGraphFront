import Vue from 'vue'
import Vuex from 'vuex'

import reports from './reports'

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
      reports
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./reports'], () => {
      const newReports = require('./reports').default
      Store.hotUpdate({ modules: { reports: newReports } })
    })
  }

  return Store
}
