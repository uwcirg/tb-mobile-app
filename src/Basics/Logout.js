import useStores from './UseStores'

export default function logoutStores(){

    const { routingStore, practitionerStore, adminStore, patientStore, practitionerUIStore,messagingStore,loginStore, uiStore } = useStores();
    const {push} = routingStore;

    return () => {
        uiStore.menuOpened = false;
        loginStore.logout();
        practitionerStore.logout();
        patientStore.logoutPatient();
        adminStore.logout();
        push("/")
    }

}