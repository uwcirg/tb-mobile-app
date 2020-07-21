import React from 'react'
import Navigation from './Navigation'
import Welcome from './Welcome'
import Progress from './Progress'
import Messaging from './Messaging'
import Outro from './Outro'

/*
    translationString is the key corresponding to the walkthrough.json file in the /public/locales folder
*/

let steps = [
    {
        push: "/home",
        title: "",
        target: "#intro-greeting",
        component: (<Welcome />),
        spotlightPadding: 10,
        placement: "center",
        fillBackground: true
    },
    {
        push: "/home",
        preventScroll: true,
        title: "",
        target: "#intro-information-button",
        translationString: "revisit",
    },
    {
        push: "/home",
        title: "",
        target: "#intro-tasks",
        placement: 'top',
        translationString: "tasks"
    },
    {
        push: "/home",
        scroll: true,
        target: "#intro-progress-card",
        translationString: "progressCard"
    },
    {
        push: "/home",
        scroll: true,
        target: "#intro-reminders-card",
        translationString: "reminders"
    },
    {
        push: "/home",
        title: "This is the navigation Bar",
        target: ".MuiBottomNavigation-root",
        preventScroll: true,
        component: (<Navigation />)
    },
    {
        scrollToTop: true,
        push: "/progress",
        target: ".intro-progress-button",
        fillBackground: true,
        component: (<Progress />)
    },
    {
        scrollToTop: true,
        push: "/progress",
        target: "#intro-week",
        translationString: "weekCalendar"
    },
    {
        scrollToTop: true,
        push: "/progress/calendar",
        target: ".intro-calendar-full",
        translationString: "calendar",
        spotlightPadding: 10
    },
    {
        push: "/progress/calendar",
        target: "#calendar-day-preview",
        translationString: "calendarBottom"
    },
    {
        push: "/progress",
        target: "#intro-milestones",
        translationString: "milestones"
    },
    {
        push: "/messaging",
        target: ".intro-messaging-button",
        placement: "top",
        fillBackground: true,
        component: (<Messaging />)
        
    },
    {
        push: "/messaging",
        target: "#intro-chat",
        translationString: "messaging.one"
    },
    {
        push: "/messaging",
        target: "#intro-chat-public",
        translationString: "messaging.two"
    },
    {
        push: "/home",
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

export default steps;