import * as types from './types';

const initialState = {
    patients: [],
    users: [],
    patientName: "Not Loaded",
    loading: false,
    currentTime: "Not Loaded"
}

const sof = (state = initialState, action) => {
    switch(action.type) {
        case types.FETCH_NEW_PATIENT:
            return {
                ...state,
                patientName: action.patientName
            }             
        case types.FETCH_NEW_TIME:
            return {
                ...state, 
                currentTime: action.currentTime 
            }
        default:
            return state;
    }
}

export default sof;