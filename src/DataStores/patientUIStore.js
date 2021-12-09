import { observable, action, computed } from 'mobx';
import onboardingTabs from '../Patient/Onboarding/StepList';

//Extends this file https://github.com/alisd23/mobx-react-router/blob/master/src/store.js

export default class PatientUIStore {

    constructor(routerStore) {
        this.router = routerStore;
    }

    @observable onWalkthrough = false;
    @observable walkthroughStep = 0;
    @observable skippedToPhotoFlow = false;

    @observable alertVisible = false;
    @observable alertText = "";
    @observable alertType = "success";

    @action goToWalkThrough = (step = 0) => {
        this.onWalkthrough = true;
        this.walkthroughStep = step;
    }

    @action goToOnboarding() {
        if (!this.onOnboarding) this.router.push("/onboarding/0")
    }

    //Patient Side Routes
    @computed get onReportFlow() {
        return this.router.location.pathname.startsWith("/home/report")
    }

    @action moveToReportFlow() {
        this.router.push(`/home/report/0`)
    }


    @action goToAddMilestone = () => {
        this.router.push(`/progress/reminders/add`)
    }

    @action goToHome = () => {
        this.router.push("/home")
    }

    @action goToCalendar = () => {
        this.router.push("/progress/calendar")
    }

    @action goToInformation = () => {
        this.router.push("/information")
    }

    @action goToMessaging = () => {
        this.router.push("/messaging")
    }

    @action goToProgress = () => {
        this.router.push("/progress")
    }

    @action previousReportStep = () => {
        if (this.reportStep > 0) {
            this.updateStep(this.reportStep - 1)
        } else {
            this.goToHome();
        }
    }

    @action nextReportStep = () => {
        this.updateStep(this.reportStep + 1)
    }

    @action startHistoricalReport = () => {
        this.router.push(`/progress/report/0`)
    }

    @action openPhotoReport = () => {
        this.updateStep(3)
    }

    @action editReport = () => {
        this.router.push('home/report/0')
    }

    @action goToReportSymptoms = () => {
        this.router.push('home/report/1')
    }

    @action goToReportMood = () => {
        this.router.push('home/report/2')
    }

    @action endReport = () => {
        if (this.onHistoricalReport) {
            this.router.push('/progress')
            return
        }
        this.router.push('/home')
    }

    @action skipToReportConfirmation = () => {
        this.router.push("/home/report/4")
    }

    @action goToTreatmentWalkThrough = () => {
        this.router.push("/home/report/0")
        this.onTreatmentWalkthrough = true;
        this.onWalkthrough = true;

    }

    @action setWalkthroughStep = (step) => {
        this.walkthroughStep = step;
    }

    @computed get reportStep() {
        const parts = this.router.location.pathname.split("/");
        const parsed = parseInt(parts[parts.length - 1])
        return parsed ? parsed : 0
    }

    @computed get onCalendar() {
        return false
    }

    @computed get tabNumber() {
        const splitPath = this.router.location.pathname.split("/");

        //Get the tab the user is one. ie. if on baseURL/home they are on the first tab
        if (splitPath[1] === "home") return 0
        if (splitPath[1] === "progress") return 1
        if (splitPath[1] === "messaging") return 2
        if (splitPath[1] === "information") return 3
        return 0
    }

    @computed get onHistoricalReport() {
        return this.router.location.pathname.startsWith("/progress/report")
    }

    @action updateStep(step) {
        const base = this.onHistoricalReport ? '/progress/report/' : '/home/report/'
        this.router.push(`${base}${step}`)
    }

    @action updateOnboardingStep(step) {
        this.router.push(`/onboarding/${step}`)
    }

    @computed get onOnboarding() {
        return this.router.location.pathname.startsWith("/onboarding/")
    }

    /* Settings getter + setter */
    @action goToSettings = () => {
        this.router.push(`${this.router.location.pathname}?onSettings=true`)
    }

    @action closeSettings = () => {
        this.router.push(this.router.location.pathname)
    }

    @computed get onSettings() {
        let search = this.router.location.search
        return (search.includes("onSettings=true"))
    }

    /* Password Update Getter + Setter */
    @computed get onPasswordUpdate() {
        return this.router.location.search.includes("&onPassword=true")
    }

    @computed get onPushEnrollmentInstructions() {
        return this.router.location.search.includes("?onPushEnrollmentInstructions=true")
    }

    @action goToPasswordUpdate = () => {
        this.router.push(`${this.router.location.pathname}?onSettings=true&onPassword=true`)
    }

    @action closePasswordUpdate = () => {
        this.goToSettings();
    }

    @action clearURL = () => {
        this.router.push("")
    }

    //Reminders
    @action goToAddReminder = () => {
        this.router.push(`${this.router.location.pathname}?onAddReminders=true`)
    }

    @action closeAddReminder = () => {
        this.router.push(this.router.location.pathname)
    }

    @computed get onAddReminder() {
        let search = this.router.location.search
        return (search.includes("onAddReminders=true"))
    }

    @computed get onInfoTestInstructions() {
        const search = this.router.location.search
        return (search.includes("testStripInstructions=true"))
    }


    @action setAlert = (text, type = "success") => {
        this.alertVisible = true;
        this.alertText = text;
        this.alertType = type;
    }

    nextOnboardingStep = () => {
        //Prevent going past the end of onboarding
        if (this.reportStep !== onboardingTabs.length - 1) {
            this.updateOnboardingStep(this.reportStep + 1);
        }
    }

    @action goToContactTracingUpdate = () => {
        this.router.push("/contact-tracing")
    }

    @action setSkippedToPhoto = (value) => {
        this.skippedToPhotoFlow = !!value;
    }

}