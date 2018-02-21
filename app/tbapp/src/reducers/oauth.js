import * as types from './types'

const initialState = {
    app: {
        name: ""
    },
    user: {
        isLoggedin: false,
        id: null,
        name: null
    },
    profile: {
        current: null
    }
}

const oauth = (state = initialState, action) => {
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
  
  export default oauth