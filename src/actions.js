import * as types from './reducers/types';

export const loginSuccess = (token, expiration) => ({
    type: types.LOGIN_SUCCESS,
    token,
    expiration,
})

export const loginFailure = error => ({
    type: types.LOGIN_FAILURE,
    error
})

export const login = (config) => ({
    type: types.LOGIN_REQUEST,
    config
})

export const logout = () => ({
    type: types.LOGOUT
})
