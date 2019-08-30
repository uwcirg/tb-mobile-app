import { action, observable, mobx,toJS} from "mobx";
import Requests from "../Requests"


const ROUTES = {

    getCurrentUser: ["/participant/current","GET"],
    updateCurrentUser: ["/participant/current","PATCH"]

        
}

export class AccountAPI {


    executeRequest(route,body){

        let routeInfo = ROUTES[route];

        if(routeInfo){
            return Requests.authenticatedRequest(...routeInfo,body);
        }else{
            throw new Error("Provided route not available.")
        }
    }
}

export class AccountStore {

    @observable currentUserAccount = {};
    @observable userInput = {
        name: "",
        phone_number: "",
        treatment_start: ""
    }

    //Takes in a data strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        this.strategy = strategy;
    }


    @action
    getCurrentUserInformation = () => {
        this.strategy.executeRequest('getCurrentUser').then( json =>{
            this.currentUserAccount = json;
        })
    }

    @action updateCurrentUserInformation = () => {
        console.log(toJS(this.userInput))
        this.strategy.executeRequest('updateCurrentUser',toJS(this.userInput)).then( json =>{
            console.log(json)
        })
    }
}