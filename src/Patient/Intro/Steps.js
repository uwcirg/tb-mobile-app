import React from 'react'
import Navigation from './Navigation'
import Welcome from './Welcome'
import Progress from './Progress'


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
        push: "/progress",
        target: "#intro-progress-full",
        fillBackground: true,
        placement: "center",
        component: (<Progress />)
    },
    {
        scrollToTop: true,
        push: "/progress",
        target: "#intro-week",
        translationString: "progress"
    },
    {
        scrollToTop: true,
        push: "/progress/calendar",
        target: ".intro-calendar-full",
        translationString: "progress",
        spotlightPadding: 10
    },
    {
        push: "/progress/calendar",
        target: "#calendar-day-preview",
        translationString: "calendarBottom"
    }
];

steps = steps.map((each) => {
    each.disableBeacon = true
    return each
})

export default steps;