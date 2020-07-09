import React from 'react'
/*
    translationString is the key corresponding to the walkthrough.json file in the /public/locales folder
*/

let steps = [
    {
        push: "/home/report/0",
        title: "",
        target: "#intro-medication-time",
        spotlightPadding: 10
    },
    {
        push: "/home/report/0",
        title: "",
        target: "#intro-medication-time",
        spotlightPadding: 10,
        translationString: "This is not fully implemented yet"
    },
    {
        placement: 'center',
        push: "/home/report/1",
        title: "",
        target: "#intro-symptoms",
        translationString: "Select any side effects you have been experiencing",
        scrollToTop: true,
    }
];

steps = steps.map((each) => {
    each.disableBeacon = true
    return each
})

export default steps;