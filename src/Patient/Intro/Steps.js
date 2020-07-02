import React from 'react'
import Navigation from './Navigation'


/*
    translationString is the key corresponding to the walkthrough.json file in the /public/locales folder
*/

let steps = [
    {
        title: "",
        target: "#intro-greeting",
        content: "",
        spotlightPadding: 10,
        preventScroll: true
    },
    {
        title: "",
        target: "#intro-information-button",
        translationString: "revisit",
        preventScroll: true
    },
    {
        title: "",
        target: "#intro-tasks",
        placement: 'top',
        translationString: "tasks"
    },
    {
        scroll: true,
        title: "",
        target: "#intro-progress",
        translationString: "progress"
    },
    {
        title: "",
        scroll: true,
        target: "#intro-reminders-card",
        translationString: "reminders"
    },
    {
        title: "This is the navigation Bar",
        target: ".MuiBottomNavigation-root",
        content: "Clicking each icon will take you to differnet pages",
        component: (<Navigation />)
    },
    {
        title: "Progress",
        target: ".intro-progress-button",
        content: "Clicking here will take you to your progress",
    },
    {
        title: "Progress",
        target: ".intro-progress-button",
        content: "Clicking here will take you to your progress",
    },
    {
        title: "Progress",
        target: ".intro-progress-button",
        content: "Clicking here will take you to your progress",
    },
    {
        title: "Progress",
        target: ".intro-progress-button",
        content: "Clicking here will take you to your progress",
    },
    {
        title: "Progress",
        target: ".intro-progress-button",
        content: "Clicking here will take you to your progress",
    }
];

steps = steps.map((each) => {
    each.disableBeacon = true
    return each
})

export default steps;