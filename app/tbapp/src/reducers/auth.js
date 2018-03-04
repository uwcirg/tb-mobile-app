import * as types from './types'
import { hasToken, getToken, getExpiresAt } from '../util/token'

const initialState = {
  isLoggedIn: hasToken(),
  token: getToken(),
  expiresAt: getExpiresAt(),
  isLoggingIn: false,
  error: null
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoggingIn: true
      })
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
        token: action.token,
        expiresAt: action.expiresAt,
        error: null,
        isLoggingIn: false
      })
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isLoggedIn: false,
        token: null,
        expiresAt: null,
        error: action.error,
        isLoggingIn: false
      })
    case types.LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        token: null,
        expiresAt: null,
        error: null,
        isLoggingIn: false
      })
    default:
      return state
  }
}

export default auth
