import EducationStore from "../educationStore";
import { PatientStore } from "../patientStore";
import TestHelper from "../MockRequests";
import { DateTime } from "luxon";
const mockApi = new TestHelper()

const patientStore = new PatientStore(mockApi);
const education = patientStore.educationStore;

//Education
it("creates store", () => {
    expect(education.educationStatus.length).toBe(0);
})

it("creates store", () => {
    expect(education.educationStatus.length).toBe(0);
})

it("defaults to blank when no local date is found", () => {
    expect(education.dateOfLastUpdateRead).toBe("");
})

patientStore.patientInformation.loaded = true;
patientStore.patientInformation.daysInTreatment = 180;

it("shows all messages as availble when patient has completed treatment", () =>{
    expect(education.availableMessages.length).toBe(19);
})

it("shows earliest message available first", () =>{
    expect(education.message).toBe(Object.values(education.treatmentUpdates)[0]);
})

