import { setToken, removeToken } from './util/token'
import authorize from './oauth2'
import { loginSuccess, loginFailure } from './actions'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './reducers/types'

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {

    case LOGIN_REQUEST:

      return authorize(action.config)
        .then(
          response => store.dispatch(
            loginSuccess(response.token, response.expiration)
          ),

          error => store.dispatch(
            loginFailure(error)
          )
      )

    case LOGIN_SUCCESS:
      setToken(action.token, action.expiration)
      break

    case LOGIN_FAILURE:
      removeToken()
      break

    case LOGOUT:
      removeToken()
      break

    default:
      break
  }

  return next(action)
}

export default authMiddleware
