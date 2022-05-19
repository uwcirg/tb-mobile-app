import isIndonesiaPilot from "../Utility/check-indonesia-flag"

const defaultSymptoms = {
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
}

const indonesiaSymptoms = {
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

const localeSymptoms = isIndonesiaPilot ? indonesiaSymptoms : defaultSymptoms;


const allSymptoms = [
    ...localeSymptoms.mild.map(symptom => { return { name: symptom, severe: false } }),
    ...localeSymptoms.severe.map(symptom => { return { name: symptom, severe: true } })
  ]



export default allSymptoms;