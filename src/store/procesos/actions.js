/* eslint-disable handle-callback-err */
import Axios from 'axios'
// import { reject, resolve } from 'core-js/fn/promise'
var baseUrl = null
if (process.env.DEV) {
  // eslint-disable-next-line no-unused-vars
  baseUrl = 'http://localhost'
} else {
  // eslint-disable-next-line no-unused-vars
  baseUrl = 'http://170.239.86.104:8000'
}

export function getTableData (context, props) {
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.post(baseUrl + '/api/getResumenProcesos?page=1', props)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export function getReporteProcesos (context, props) {
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.post(baseUrl + '/api/getReporteProcesos', props)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export function getChartProcesosRendimiento (context, props) {
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.post(baseUrl + '/api/getChartProcesosRendimiento', props)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export function setVariedad (context, props) {
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.post(baseUrl + '/api/getVariedades', props)
        .then(response => {
          context.commit('setVariedad', response.data)
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export function setProductor (context, props) {
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.post(baseUrl + '/api/getProductores', props)
        .then(response => {
          context.commit('setProductor', response.data)
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export function setFiltrarPor (context, props) {
  context.commit('setFiltrarPor', props)
}

export function setActiveFilter (context, props) {
  context.commit('setActiveFilter', props.value)
}
