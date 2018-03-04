import {
    combineReducers
} from 'redux';
import auth from './auth'

const tbApp = combineReducers({
    auth
}) 
 
export default tbApp;