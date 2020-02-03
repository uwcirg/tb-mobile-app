import { action, observable, computed} from "mobx";
import APIStore from './apiStore'

export class UserStore extends APIStore{

    @observable userType = "";

    @observable userID = ""
    @observable token = ""
    @observable givenName = ""
    @observable familyName = ""
    @observable expired = false;
    @observable isLoggedIn = false;

    constructor(strategy,routes,userType){
        super(strategy,routes);
        this.userType = userType;
    }

    logout(){

    }

    initalize(){
      this.executeRequest(`getCurrent${this.userType}`).then( (json) => {
        if(json.id){
            this.setAccountInformation(json)
            this.isLoggedIn = true;
        }
    });


    }

    clearLocalStorage(){
      localStorage.removeItem("user.token");
      localStorage.removeItem("user.id");
      localStorage.removeItem("user.type");
  }

    /*  FOR FUTURE Notifications implementation
    
    const apiURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:5061" : "https://tb-api-test.cirg.washington.edu";



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
    */




}

