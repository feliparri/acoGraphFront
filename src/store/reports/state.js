export default function () {
  return {
    // drawerState: true,
    // logedIn: false,
    token: localStorage.getItem('access_token') || null,
    productores: [],
    variedades: [],
    filtro: [],
    filtrarPor: { filterTwo: 'todo' }
  }
}
