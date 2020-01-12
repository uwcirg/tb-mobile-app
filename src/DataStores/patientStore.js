import { action, observable, computed} from "mobx";
//import { mdiJson } from "@mdi/js";

const ROUTES = {
    login: ["/authenticate","POST"],
    register: ["/participant","POST"],
    saveNote: ["/participant/current/notes","POST"],
    reportMedication: ["/participant/current/medication_report","POST"],
    reportSymptoms: ["/participant/current/symptom_report","POST"],
    getCurrentPatient: ["/patient/me","GET"],
    getVapidKey: ["/push_key","GET"]
}

const apiURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:5061" : "https://tb-api-test.cirg.washington.edu";

export class PatientStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        this.strategy = strategy;
    }

    @observable loginPhoneNumber = "";
    @observable loginPassword = "";

    @observable userID = ""
    @observable token = ""
    @observable given_name = ""
    @observable family_name = ""
    @observable phone_number = ""
    @observable information = {}
    @observable notes = []
    @observable expired = false;

    @observable isLoggedIn = false;


    /*
    @observable initalLogIn = false;

    @computed get isLoggedIn(){
        return( (this.userID && this.token) || this.initalLogIn )
    }
    */

    initalize(token,id){
        if(token && id){
            this.isLoggedIn = true;
            this.getPatientInformation();
        }

    }
    
    executeRequest(type,body){
        return this.strategy.executeRequest(ROUTES,type,body).then(res =>{
            if( res instanceof Error){
                //Check if loggin to provide different error
                if(type != "login"){

                    //The token expiration should only be set to true if they 
                    //have not already been logged out, this prevents 2 messages
                    if(this.userID){
                    this.expired = true;
                    }
                }
                return ""
            }else{
                return res
            }
        })
    }

    setAccountInformation(json){
        console.log(json);
        this.information = json;
        this.given_name = json.given_name;
        this.family_name = json.family_name;
        this.userID = json.user_id;
        this.phone_number= json.phone_number;
        this.notes = json.notes;
    }

    @action getPatientInformation(){

        this.executeRequest('getCurrentPatient').then(json =>{
            this.setAccountInformation(json);
        })
    }

    @action login = () =>{
        let body = {
            phoneNumber: this.loginPhoneNumber,
            password: this.loginPassword,
            userType: "Patient"
        }

        return this.executeRequest('login', body).then(json => {

            if(json && json.user_id){
                this.initalLogIn = true;
                localStorage.setItem("user.token", json.token);
                localStorage.setItem(`userID`,json.user_id);
                localStorage.setItem("token.exp",json.exp);
                this.getPatientInformation()
                this.isLoggedIn = true;
                //this.subscribeToNotifications();
                return true
            }
            return false;
            
        })
    }

    @action register(body){
        return this.executeRequest('register',body).then(json =>{
            this.setAccountInformation(json);
        });
    }

    @action saveNote(body){
        return this.executeRequest('saveNote',body).then(json => {
            this.notes = json;
        });
    }

    @action reportMedication(body){
        return this.executeRequest('reportMedication',body).then(json => {
            this.getPatientInformation();
        });
    }

    @action reportSymptoms(body){
       
        return this.executeRequest('reportSymptoms',body).then(json => {
           this.getPatientInformation();
        });
    }


    @action logout = () => {

        //Remove persistant user information
        this.clearLocalStorage();
        this.unsubscribeFromNotifications();

        //Clear MobX Session Data
        this.userID = ""
        this.token = ""
        this.name = ""
        this.phone_number = ""
        this.information = {}
        this.notes = []
        this.expired = false;
        this.isLoggedIn = false;

    }
    

    clearLocalStorage(){
        localStorage.removeItem("user.token");
        localStorage.removeItem("userID");
    }

    unsubscribeFromNotifications(){
            navigator.serviceWorker.ready.then(registration => {
              //Find the registered push subscription in the service worker
              registration.pushManager
                .getSubscription()
                .then(subscription => {
                  if (!subscription) {
                    return 
                    //If there isn't a subscription, then there's nothing to do
                  }
                
                  subscription
                    .unsubscribe()
                    .then(() => console.log("unsubscribe"))
                    .catch(err => console.error(err))
                })
                .catch((err) => console.error(err))
            })
    }

    subscribeToNotifications() {

        navigator.serviceWorker.ready.then(registration => {

          if (!registration.pushManager) {
            alert("Push Unsupported")
            return
          }
          
          registration.pushManager
            .subscribe({
              userVisibleOnly: true, //Always display notifications
              applicationServerKey: this.urlB64ToUint8Array(localStorage.getItem("vapidKey"))
            })
            .then(subscription => this.updateSubscriptionOnServer(subscription))
            .catch(err => console.error("Push subscription error: ", err))
        })
      }

      updateSubscriptionOnServer(subscription) {

        if (subscription) {
          let sj = JSON.stringify(subscription);
          subscription = JSON.parse(sj);
      
          let body = JSON.stringify({
            userID: this.userID,
            endpoint: subscription.endpoint,
            auth: subscription.keys.auth,
            p256dh: subscription.keys.p256dh
          })
      
          
          return fetch(`${apiURL}/update_user_subscription`, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json'
            },
            body: body
          });
         
        } else {
          
        }
      }

      getVapidKeyFromServerAndStoreLocally(){
        this.executeRequest('getVapidKey').then(json =>{
            localStorage.setItem("vapidKey",json.key)
        })
      }

     urlB64ToUint8Array = (base64String)  => {
        try{
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/\-/g, '+')
          .replace(/_/g, '/');
      
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
      
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;

        }catch(err){
            alert(err);
        }

    }

}
