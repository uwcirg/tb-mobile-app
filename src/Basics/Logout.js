import useStores from './UseStores'

export default function logoutStores(){

    const { routingStore, practitionerStore, adminStore, patientStore, practitionerUIStore,messagingStore,loginStore } = useStores();
    const {push} = routingStore;

    return () => {
        loginStore.logout();
        practitionerStore.logout();
        patientStore.logout();
        adminStore.logout();
        push("/")
    }

}