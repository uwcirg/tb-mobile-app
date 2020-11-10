import React from 'react'
import Navigation from './Navigation'
import Welcome from './Welcome'
import Progress from './Progress'
import Messaging from './Messaging'
import Outro from './Outro'
import groupBy from 'lodash/groupBy';


/*
    translationString is the key corresponding to the translation.json file in the /public/locales folder
*/

let steps = [
    {
        push: "home",
        title: "",
        target: "#intro-greeting",
        component: (<Welcome />),
        spotlightPadding: 10,
        placement: "center",
        fillBackground: true
    },
    {
        push: "home",
        title: "This is the navigation Bar",
        target: ".MuiBottomNavigation-root",
        preventScroll: true,
        component: (<Navigation />)
    },
    {
        push: "home",
        preventScroll: true,
        title: "",
        target: "#intro-information-button",
        translationString: "patient.walkthrough.revisit",
    },
    {
        push: "home",
        preventScroll: true,
        title: "",
        target: "#intro-home-button",
        translationString: "patient.walkthrough.homescreen",
    },
    {
        push: "home",
        title: "",
        target: "#intro-tasks",
        placement: 'top',
        translationString: "patient.walkthrough.tasks"
    },
    {
        push: "home",
        scroll: true,
        target: "#intro-progress-card",
        translationString: "patient.walkthrough.progressCard"
    },
    {
        push: "home",
        scroll: true,
        target: "#intro-reminders-card",
        translationString: "patient.walkthrough.reminders"
    },
    {
        scrollToTop: true,
        push: "progress",
        target: ".intro-calendar-full",
        translationString: "patient.walkthrough.calendar",
        spotlightPadding: 10
    },
    {
        push: "progress",
        target: "#calendar-day-preview",
        translationString: "patient.walkthrough.calendarBottom"
    },
    {
        push: "messaging",
        target: ".intro-messaging-button",
        placement: "top",
        fillBackground: true,
        component: (<Messaging />)
        
    },
    {
        push: "messaging",
        target: "#intro-chat",
        translationString: "patient.walkthrough.messaging.one"
    },
    {
        hideExit: true,
        push: "messaging",
        target: "#intro-chat-public",
        translationString: "patient.walkthrough.messaging.two"
    },
    {
        push: "home",
        target: "#intro-greeting",
        placement: "center",
        fillBackground: true,
        component: (<Outro />)
    },
];

steps = steps.map((each) => {
    each.disableBeacon = true
    return each
})


const a = groupBy(steps, "push");
export {a}

export default steps;