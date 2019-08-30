import React from "react"
import ReactDOM from "react-dom"
import Assembly from "./Assembly"
import { Provider } from 'mobx-react';

//Stores 
import {AccountStore} from './stores/accountStore'
import {AccountAPI} from './stores/accountStore'

const APIS = {
    accountAPI: new AccountAPI()
}

const stores = {
    accountStore: new AccountStore(APIS.accountAPI)
}

ReactDOM.render((<Provider {...stores}> 
<Assembly /> 
</Provider>), document.getElementById('root'))
