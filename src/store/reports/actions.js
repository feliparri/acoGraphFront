/* eslint-disable handle-callback-err */
import Axios from 'axios'
// import { reject, resolve } from 'core-js/fn/promise'

export function retrieveToken (context, credentials) {
  return new Promise((resolve, reject) => {
    Axios.post('http://localhost:80/api/login', {
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
      Axios.post('http://localhost:80/api/logout')
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

export function getTableData (context, credentials) {
  Axios.defaults.headers.common.Authorization = 'Bearer ' + context.state.token

  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      Axios.get('http://localhost/api/getResumenLote?page=1')
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }
}
