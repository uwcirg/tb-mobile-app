import useStores from "./UseStores";

export default function logoutStores() {
  const { routingStore, practitionerStore, patientStore, loginStore, uiStore } =
    useStores();
  const { push } = routingStore;

  return () => {
    uiStore.menuOpened = false;
    loginStore.logout();
    practitionerStore.logout();
    patientStore.logoutPatient();
    push("/");
  };
}
