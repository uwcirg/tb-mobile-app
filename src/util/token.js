export const getExpiration = () =>
  Number(window.localStorage.getItem("expiration")) || null

export const hasToken = () => getToken() !== null

// Returns the token, *only* if it has not expired yet.
export const getToken = () => {
  const expired = getExpiration() < Date.now()
  const token = window.localStorage.getItem("token")

  return (token && !expired)
    ? token
    : null
}

export const setToken = (token, expiration) => {
  // Token
  if(token)
    window.localStorage.setItem("token", token)
  else
    window.localStorage.removeItem("token")

  // Expiration
  if(expiration)
    window.localStorage.setItem("expiration", expiration)
  else
    window.localStorage.removeItem("expiration")
}

export const removeToken = () => {
  window.localStorage.removeItem("token")
  window.localStorage.removeItem("expiration")
}
