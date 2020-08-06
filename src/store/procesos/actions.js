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
      Axios.post(baseUrl + '/api/getResumenLote?page=1', props)
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

export function setFiltrarPor (context, props) {
  context.commit('setFiltrarPor', props)
}

export function setActiveFilter (context, props) {
  console.log(props.value)
  context.commit('setActiveFilter', props.value)
}
