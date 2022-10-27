import React from "react";
import SymptomList from "../SymptomList";

import { render, stores, fireEvent } from "../../../Utility/test-utils";

it("renders using render function without errror", () => {
  stores.patientStore.initalize();
  render(<SymptomList />);
});

it("selects symptom when clicked on label", async () => {
  const { container } = render(<SymptomList />);
  const checkbox = container.querySelector("#nausea");
  expect(checkbox).toBeTruthy();
  await fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(stores.patientStore.report.selectedSymptoms.length).toBe(1);
});

it("expands subtitle when expansion button is clicked on", async () => {
  const { getByTestId } = render(<SymptomList />);
  const dropdownButton = getByTestId("dropdown-redness");
  const subtitle = getByTestId("subtitle-redness");
  expect(dropdownButton).toBeTruthy();
  expect(subtitle).not.toBeVisible();
  await fireEvent.click(dropdownButton);
  expect(subtitle).toBeVisible();
  expect(subtitle).toHaveTextContent("Swelling, redness, itching of skin");
});

it("renders 14 symptoms when indonesia locale is provided", async () => {
  const { queryAllByRole } = render(<SymptomList symptomLocale="indonesia" />);
  const checkBoxes = queryAllByRole("checkbox");
  expect(checkBoxes.length).toBe(14);
});
