export function signIn() {
  localStorage.setItem('accessToken', 'testToken')
}

export function signOut() {
  localStorage.removeItem('accessToken')
}

export function getToken() {
  return localStorage.getItem('accessToken')
}
