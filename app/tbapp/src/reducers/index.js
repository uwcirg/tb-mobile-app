import {
    combineReducers
} from 'redux';
import { authReducer as auth } from './'


// import oauth from './oauth'

const tbApp = combineReducers({
    auth
}) 

export default tbApp;