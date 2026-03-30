import { tokenStorage } from '@/lib/tokenStorage'

const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6OTk5OTk5OTk5OX0.mock-signature'
const MOCK_REFRESH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6OTk5OTk5OTk5OTk5fQ.mock-refresh-signature'

export type UserPayloadType = {
  userId: string
  role: string
  exp: number
}

export type TokenInfoType = {
  header: object
  payload: UserPayloadType
  signature: string
}

export function signIn(payload) {

  const { id, pw } = payload

  return new Promise((resolve, reject) => {

    //@TODO API Validate 후에 토큰 저장
    if (id === 'admin' && pw === '1234') resolve(true)
    else reject('아이디 또는 비밀번호가 잘못되었습니다.')

  }).then(res => {

    tokenStorage.setAccess(MOCK_TOKEN)
    tokenStorage.setRefresh(MOCK_REFRESH_TOKEN)

  })

}

export function signInWithOAuth(platform, code) {

  if ( platform !== 'google' ) return Promise.reject('지원하지 않는 플랫폼 입니다.')

  if ( platform == 'google' ) {

    return new Promise((resolve) => {

      //@TODO 백엔드 code 전달 후 JWT 수신
      alert( code )
      resolve(true)

    }).then(res => {

      tokenStorage.setAccess(MOCK_TOKEN)
      tokenStorage.setRefresh(MOCK_REFRESH_TOKEN)

    })

  }

}

export function signOut() {

  tokenStorage.removeAccess()
  tokenStorage.removeRefresh()

}

export function refreshAccessToken() {

  const refreshToken = getParsedRefreshToken()
  if(!refreshToken) return null

  // @TODO Refresh 토큰을 이용해 통신 후 access Token 을 갱신한다.
  tokenStorage.setAccess('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6OTk5OTk5OTk5OX0.mock-signature')

  return getParsedToken()

}

export function getRawToken() {
  return tokenStorage.getAccess()
}

export function getParsedToken(): TokenInfoType | null {

  const token = getRawToken()

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

export function getParsedRefreshToken() {

  const token = tokenStorage.getRefresh()

  if( !token ) return null

  const tokens = token.split('.')
  const payload = JSON.parse( atob( tokens[1] ) )

  if( payload.exp < Date.now() / 1000) return null

  return {
    userId: payload.userId,
  }

}
