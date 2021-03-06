export const retrieveToken = (state, token) => {
  // state.logedIn = true
  state.token = token
}
export const destroyToken = (state) => {
  // state.logedIn = true
  state.token = null
}
export const setProductor = (state, productores) => {
  console.log(productores)
  state.productores = []
  state.productores.push('todo')
  productores.forEach(element => {
    // state.productores.push(shortName(element.productor))
    state.productores.push(element.productor)
  })
}

/* const shortName = (texto) => {
  var spltext = texto.split('-')
  var txt = spltext[1].substring(0, 15).trim()
  return txt.substring(0, 15)
} */

export const setVariedad = (state, variedades) => {
  state.variedades = variedades
}

export const setChartLoading = (state, chartLoading) => {
  state.chartLoading = chartLoading.loading
}

export const setActiveFilter = (state, filtro) => {
  state.filtro = []
  if (filtro === 'PRODUCTOR') {
    state.filtro = state.productores
  } else if (filtro === 'VARIEDAD') {
    state.variedades.forEach(element => {
      state.filtro.push(element.variedad)
    })
  } else {
    state.filtro = []
  }
}

export const setFiltrarPor = (state, filtrarPor) => {
  state.filtrarPor = filtrarPor.filterTwo !== null ? filtrarPor : { filterTwo: 'todo' }
}

export const unsetAllGeneralStates = (state, filtrarPor) => {
  state.token = null
  state.productores = []
  state.variedades = []
  state.filtro = []
  state.filtrarPor = { filterTwo: 'todo' }
  state.chartLoading = false
}
