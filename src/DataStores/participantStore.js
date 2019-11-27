import { action, observable, computed} from "mobx";
//import { mdiJson } from "@mdi/js";

const ROUTES = {
    login: ["/auth/login/participant","POST"],
    register: ["/participant","POST"],
    saveNote: ["/participant/current/notes","POST"],
    reportMedication: ["/participant/current/medication_report","POST"],
    reportSymptoms: ["/participant/current/symptom_report","POST"],
    getCurrentParticipant: ["/participant/current","GET"],
    getVapidKey: ["/push_key","GET"]
}

const apiURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:5061" : "https://tb-api-test.cirg.washington.edu";

export class ParticipantStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        this.strategy = strategy;
    }

    @observable loginPhoneNumber = "";
    @observable loginPassword = "";

    @observable uuid = ""
    @observable name = ""
    @observable phone_number = ""
    @observable information = {}
    @observable notes = []
    @observable expired = false;

    @observable initalLogIn = false;

    @computed get isLoggedIn(){
        return( (this.uuid && this.token) || this.initalLogIn )
    }

    executeRequest(type,body){
        return this.strategy.executeRequest(ROUTES,type,body).then(res =>{
            if( res instanceof Error){
                //Check if loggin to provide different error
                if(type != "login"){

                    //The token expiration should only be set to true if they 
                    //have not already been logged out, this prevents 2 messages
                    if(this.uuid){
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
        this.information = json;
        this.name = json.name;
        this.uuid = json.uuid;
        this.phone_number= json.phone_number;
        this.notes = json.notes;
    }

    @action getParticipantInformation(){

        this.executeRequest('getCurrentParticipant').then(json =>{
            this.setAccountInformation(json);
        })
    }

    @action login = () =>{
        let body = {
            phone_number: this.loginPhoneNumber,
            password: this.loginPassword
        }

        return this.executeRequest('login', body).then(json => {

            if(json && json.uuid){
                this.initalLogIn = true;
                localStorage.setItem("user.token", json.token);
                localStorage.setItem(`participant.uuid`,json.uuid);
                localStorage.setItem("token.exp",json.exp);
                this.getParticipantInformation()
                this.subscribeToNotifications();
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
            this.getParticipantInformation();
        });
    }

    @action reportSymptoms(body){
       
        return this.executeRequest('reportSymptoms',body).then(json => {
           this.getParticipantInformation();
        });
    }


    @action logout = () => {

        //Remove persistant user information
        this.clearLocalStorage();
        this.unsubscribeFromNotifications();

        //Clear MobX Session Data
        this.uuid = ""
        this.token = ""
        this.name = ""
        this.phone_number = ""
        this.information = {}
        this.notes = []
        this.expired = false;

    }
    

    clearLocalStorage(){
        localStorage.removeItem("user.token");
        localStorage.removeItem("participant.uuid");
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
            uuid: this.uuid,
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
