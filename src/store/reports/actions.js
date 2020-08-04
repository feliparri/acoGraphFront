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

export function retrieveToken (context, credentials) {
  return new Promise((resolve, reject) => {
    Axios.post(baseUrl + '/api/login', {
      username: credentials.username,
      password: credentials.password
    }).then(response => {
      const token = response.data.access_token
      localStorage.setItem('access_token', token)
      context.commit('retrieveToken', token)
      resolve(response)
    }).catch(error => {
      console.log(context)
      reject(error)
    })
  })
}

export function getUserData (context) {
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.get(baseUrl + '/api/user')
        .then(response => {
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('email', response.data.email)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export function destroyToken (context) {
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.post(baseUrl + '/api/logout')
        .then(response => {
          localStorage.removeItem('access_token')
          context.commit('destroyToken')
          resolve(response)
        }).catch(error => {
          localStorage.removeItem('access_token')
          context.commit('destroyToken')
          reject(error)
        })
    })
  }
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

export function getPieChartData (context, props) {
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.post(baseUrl + '/api/getPieChartData', props)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export function getPieChartDataByCodVariedad (context, props) {
  console.log(props)
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.post(baseUrl + '/api/getPieChartDataByCodVariedad', props)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export function getPieChartDataByCodVariedadInv (context, props) {
  console.log(props)
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.post(baseUrl + '/api/getPieChartDataByCodVariedadInv', props)
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export function getPieChartDataByPesoMes (context, props) {
  console.log(props)
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.post(baseUrl + '/api/getPieChartDataByPesoMes', props)
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

export function setProductor (context, props) {
  // context.commit('setProductor', props.xAxisData)
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

export function setActiveFilter (context, props) {
  console.log(props.value)
  context.commit('setActiveFilter', props.value)
}
