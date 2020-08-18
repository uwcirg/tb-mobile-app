const Symptoms = [
  "sore_belly",
  "nausea",
  "redness",
  "fever",
  "appetite_loss"

]

//Nausea > 6 needs to be included here
const SevereSymptoms = [
  "hives",
  "blurred_vision",
  "yellow_coloration",
  "difficulty_breathing",
  "facial_swelling"
]

const findCommonElements = (arr1, arr2) => {
  return arr1.some(item => arr2.includes(item))
}

const getFirstSevereSymptomFromArray = (arr) => {
  return arr.find(each => {
    return SevereSymptoms.includes(each)
  })
}

export { Symptoms, SevereSymptoms, findCommonElements, getFirstSevereSymptomFromArray }