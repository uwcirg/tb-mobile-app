import * as types from './types'

const initialState = {
  collapsed: false,
}

const nav = (state = initialState, action) => {
    switch (action.type) {
      case types.TOGGLE_NAV:
        return {
            ...state,
            collapsed: !state.collapsed
        }
      default:
        return state
    }
  }
  
  export default nav