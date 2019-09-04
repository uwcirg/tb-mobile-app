import React from "react"
import ReactDOM from "react-dom"
import Assembly from "./Assembly"
import { Provider } from 'mobx-react';

//Stores 
import {AccountStore} from './stores/accountStore'
import {CoordinatorStore} from './stores/coordinatorStore'
import APIHelper from './Requests'

//This attaches the class containing the API fetch requests to the stores
//Doing it this way allows you to swap in other data retrival methods for testing
const apiHelper = new APIHelper();

const stores = {
    accountStore: new AccountStore(apiHelper),
    coordinatorStore: new CoordinatorStore(apiHelper)
}

ReactDOM.render((<Provider {...stores}> 
<Assembly /> 
</Provider>), document.getElementById('root'))
