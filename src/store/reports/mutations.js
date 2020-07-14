export const retrieveToken = (state, token) => {
  // state.logedIn = true
  state.token = token
}
export const destroyToken = (state) => {
  // state.logedIn = true
  state.token = null
}
