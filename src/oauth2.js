import querystring from "query-string"
import cuid from "cuid"

const finish_flow = (hash, resolve, reject) => {
  const response = querystring.parse(hash.substr(1))
  let state = localStorage.getItem("oauth_state")

  if(response.state !== state)
    reject('Invalid state returned.')

  if(response.access_token) {
    let expiration = response.expires_in
      ? Date.now() + response.expires_in * 1000
      : null

    resolve({
      token: response.access_token,
      expiration
    })
  }

  else
    reject(response.error || 'Unknown error.')
}

const start_flow = config => {
  const state = cuid()

  const query = querystring.stringify({
    state,
    response_type: 'token',
    client_id: config.client,
    scope: config.scope,
    redirect_uri: config.redirect
  })

  localStorage.setItem("oauth_state", state)
  const url = config.url + (config.url.indexOf('?') === -1 ? '?' : '&') + query
  window.location = url
}

let auth_functions = { start_flow, finish_flow }

export default auth_functions
