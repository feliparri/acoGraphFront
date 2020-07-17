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
  console.log(props)
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
