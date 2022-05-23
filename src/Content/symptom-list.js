const localeSymptoms = {
    argentina: {
        mild: [
            "sore_belly",
            "nausea",
            "redness",
            "fever",
            "appetite_loss"
        ],
        severe: [
            "hives",
            "blurred_vision",
            "yellow_coloration",
            "difficulty_breathing",
            "facial_swelling"
        ]
    },
    indonesia: {
        mild: [
            "appetite_loss",
            "nausea",
            "flu_symptoms",
            "red_urine",
            "sleepy",
            "joint_pain",
            "burning_or_numbness"
        ],
        severe: [
            "yellow_coloration",
            "hearing_loss",
            "blurred_vision",
            "redness",
            "vertigo",
            "confusion",
            "oliguria",

        ]
    }
}

function getSymptoms(locale) {

    const symptoms = localeSymptoms[locale];

    return [
        ...symptoms.mild.map(symptom => { return { name: symptom, severe: false } }),
        ...symptoms.severe.map(symptom => { return { name: symptom, severe: true } })
    ]
}



export {getSymptoms, localeSymptoms};