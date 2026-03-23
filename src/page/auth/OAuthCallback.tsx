export default function OAuthCallback() {

  const code = new URLSearchParams(window.location.search).get('code')

  if ( window.opener && code ) {
    window.opener.postMessage({ code }, window.location.origin)
  }

  window.close()

  return null
}