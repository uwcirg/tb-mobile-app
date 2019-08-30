import React from "react"
import ReactDOM from "react-dom"
import Assembly from "./Assembly"
import { Provider } from 'mobx-react';

//Stores 
import {AccountStore} from './stores/accountStore'
import {AccountAPI} from './stores/accountStore'

//This attaches the class containing the API fetch requests to the stores
//Doing it this way allows you to swap in other data retrival methods for testing
const APIS = {
    accountAPI: new AccountAPI()
}

const stores = {
    accountStore: new AccountStore(APIS.accountAPI)
}

ReactDOM.render((<Provider {...stores}> 
<Assembly /> 
</Provider>), document.getElementById('root'))
