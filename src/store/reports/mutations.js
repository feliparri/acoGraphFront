export const retrieveToken = (state, token) => {
  // state.logedIn = true
  state.token = token
}
export const destroyToken = (state) => {
  // state.logedIn = true
  state.token = null
}
export const setProductor = (state, productores) => {
  state.productores = []
  state.productores.push('todo')
  productores.forEach(element => {
    console.log(element.productor)
    state.productores.push(shortName(element.productor))
  })
}

const shortName = (texto) => {
  var spltext = texto.split('-')
  var txt = spltext[1].substring(0, 15).trim()
  return txt.substring(0, 10)
}

export const setVariedad = (state, variedades) => {
  state.variedades = variedades
}

export const setActiveFilter = (state, filtro) => {
  state.filtro = []
  if (filtro === 'PRODUCTOR') {
    state.filtro = state.productores
  } else if (filtro === 'VARIEDAD') {
    console.log(state.variedades)
    state.variedades.forEach(element => {
      state.filtro.push(element.variedad)
    })
  } else {
    state.filtro = []
  }
}

export const setFiltrarPor = (state, filtrarPor) => {
  console.log(filtrarPor.filterTwo !== null)
  state.filtrarPor = filtrarPor.filterTwo !== null ? filtrarPor : { filterTwo: 'todo' }
}
