export function loggedIn(state) {
  return state.token !== null && state.user !== null;
}

export function tokenExpired(state) {
  return state.tokenExpiredAt && new Date().getTime() > state.tokenExpiredAt * 1000;
}
