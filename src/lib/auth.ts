const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6OTk5OTk5OTk5OX0.mock-signature'

export function signIn() {
  localStorage.setItem('accessToken', MOCK_TOKEN)
}

export function signOut() {
  localStorage.removeItem('accessToken')
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

