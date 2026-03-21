const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6OTk5OTk5OTk5OX0.mock-signature'
const MOCK_REFRESH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6OTk5OTk5OTk5OTk5fQ.mock-refresh-signature'

export function signIn() {

  localStorage.setItem('accessToken', MOCK_TOKEN)
  localStorage.setItem('refreshToken', MOCK_REFRESH_TOKEN)

}

export function signOut() {

  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

}

export function refreshAccessToken() {

  const refreshToken = getRefreshToken()
  if(!refreshToken) return null

  // @TODO Refresh 토큰을 이용해 통신 후 refresh Token 을 저장한다.
  localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6OTk5OTk5OTk5OX0.mock-signature')

  return getToken()

}

export function getToken() {

  const token = localStorage.getItem('accessToken')

  if( !token ) return null

  const tokens = token.split('.')
  const header = JSON.parse( atob( tokens[0] ) )
  const payload = JSON.parse( atob( tokens[1] ) )

  if( payload.exp < Date.now() / 1000) return null
  
  const signature = tokens[2]

  return {
    header, payload, signature
  }

}

export function getRefreshToken() {

  const token = localStorage.getItem('refreshToken')

  if( !token ) return null

  const tokens = token.split('.')
  const payload = JSON.parse( atob( tokens[1] ) )

  if( payload.exp < Date.now() / 1000) return null
  
  return {
    userId: payload.userId,
    exp: payload.exp
  }

}

