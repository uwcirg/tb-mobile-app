import { action, observable, computed} from "mobx";
import APIStore from './apiStore'

    const USER_ROUTES = {
      logout: ["/auth", "DELETE"],
      getVapidKey: ["/push_key","GET"],
      updateSubscription: ["/update_user_subscription","PATCH"]
    }

export class UserStore extends APIStore{

    @observable userType = "";
    @observable userID = ""
    @observable token = ""
    @observable givenName = ""
    @observable familyName = ""
    @observable expired = false;
    @observable isLoggedIn = false;

    constructor(strategy,routes,userType){
        const mergedRoutes = {...USER_ROUTES,...routes}
        super(strategy,mergedRoutes);
        this.userType = userType;
    }

    @action setAccountInformation(json){
      this.givenName = json.givenName;
      this.familyName = json.familyName;
      this.userID = json.identifier[0].value;
      this.managingOrganization = json.managingOrganization

      //TODO move this to to patient store and use Super call
      if(this.userType = "Patient"){
        this.photoSchedule = JSON.parse(json.medicationSchedule)
        this.treatmentStart = json.treatmentStart
      }
      
  }

    @action logout = () => {
        this.executeRequest('logout').then( (json) => {
          this.isLoggedIn = false;
        })

    }

    initalize(){

      this.executeRequest(`getCurrent${this.userType}`).then( (json) => {
        if(json.identifier){
            this.setAccountInformation(json)
            this.isLoggedIn = true;
            this.subscribeToNotifications();
        }
    });

    }

    clearLocalStorage(){
      localStorage.removeItem("user.token");
      localStorage.removeItem("user.id");
      localStorage.removeItem("user.type");
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


          this.getVapidKeyFromServerAndStoreLocally().then(() => {
            registration.pushManager.subscribe({
              userVisibleOnly: true, //Always display notifications
              applicationServerKey: this.urlB64ToUint8Array(localStorage.getItem("vapidKey"))
            })
            .then(subscription => this.updateSubscriptionOnServer(subscription))
            .catch(err => console.error("Push subscription error: ", err))
        })
      })
          
      }

    updateSubscriptionOnServer = (subscription) => {

        if (subscription) {
          let sj = JSON.stringify(subscription);
          subscription = JSON.parse(sj);
      
          let body = {
            userID: this.userID,
            endpoint: subscription.endpoint,
            auth: subscription.keys.auth,
            p256dh: subscription.keys.p256dh
          }
      
          
          return this.executeRequest("updateSubscription",body)
        }

      }

      getVapidKeyFromServerAndStoreLocally = () =>{
        return this.executeRequest('getVapidKey').then(json =>{
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