import React from 'react'
import Navigation from './Navigation'


/*
    translationString is the key corresponding to the walkthrough.json file in the /public/locales folder
*/

let steps = [
    {
        push: "/home",
        title: "",
        target: "#notreal",
        content: "",
        spotlightPadding: 10,
        preventScroll: true,
    },
    {
        push: "/home",
        title: "",
        target: "#intro-information-button",
        translationString: "revisit",
        preventScroll: true
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
        target: "#intro-reminders-card",
        translationString: "reminders"
    },
    {
        push: "/home",
        title: "This is the navigation Bar",
        target: ".MuiBottomNavigation-root",
        component: (<Navigation />)
    },
    {
        scrollToTop: true,
        push: "/progress",
        target: "#intro-cal",
        translationString: "progress"
    },
    {
        scrollToTop: true,
        push: "/progress/calendar",
        target: ".intro-calendar-full",
        translationString: "progress",
        spotlightPadding: 10,
    }
];

steps = steps.map((each) => {
    each.disableBeacon = true
    return each
})

export default steps;