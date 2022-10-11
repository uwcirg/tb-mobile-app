import EducationStore from "../educationStore";
import { PatientStore } from "../patientStore";
import TestHelper from "../MockRequests";
import { DateTime } from "luxon";
const mockApi = new TestHelper();

const patientStore = new PatientStore(mockApi);
const education = new EducationStore(patientStore);

it("checks current photo day", () => {
  patientStore.photoSchedule[`${DateTime.local().toISODate()}`] = true;
  patientStore.photoSchedule[
    `${DateTime.local().plus({ days: 1 }).toISODate()}`
  ] = true;
  expect(patientStore.isPhotoDay).toBe(true);
  expect(patientStore.checkPhotoDay(DateTime.local().minus({ days: 1 }))).toBe(
    false
  );
  expect(patientStore.checkPhotoDay(DateTime.local().plus({ days: 1 }))).toBe(
    true
  );
});

//Education Section
it("creates store", () => {
  expect(education.educationStatus.length).toBe(0);
});

it("creates store", () => {
  expect(education.educationStatus.length).toBe(0);
});
