import {
    combineReducers
} from 'redux';
import { authReducer as auth } from '../redux-implicit-oauth2'


import sof from './sof'
import nav from './nav'
// import oauth from './oauth'

const mpowerLiteApp = combineReducers({
    auth,
    sof,
    nav
}) 

export default mpowerLiteApp;