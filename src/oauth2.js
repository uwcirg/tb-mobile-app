import querystring from 'query-string'
import cuid from 'cuid'
import openPopup from './util/popup'

// Runs on a recursively-scheduled timer loop while the popup is open
const listenForCredentials = (popup, state, resolve, reject) => {
  let hash

  try {
    hash = popup.location.hash
  } catch (err) {}

  if (hash) {
    popup.close()
    oauth(hash, state, resolve, reject)

  } else if (popup.closed) {
    reject('Authentication was cancelled.')

  } else {
    setTimeout(
      () => listenForCredentials(popup, state, resolve, reject),
      100,
    )
  }
}

const oauth = (hash, state, resolve, reject) => {
  const response = querystring.parse(hash.substr(1))

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

const authorize = config => {
  const state = cuid()

  const query = querystring.stringify({
    state,
    response_type: 'token',
    client_id: config.client,
    scope: config.scope,
    redirect_uri: config.redirect
  })

  const url = config.url + (config.url.indexOf('?') === -1 ? '?' : '&') + query
  const width = config.width || 400
  const height = config.height || 400
  const popup = openPopup(url, 'oauth2', width, height)

  return new Promise((resolve, reject) =>
    listenForCredentials(popup, state, resolve, reject)
  )
}

export default authorize
