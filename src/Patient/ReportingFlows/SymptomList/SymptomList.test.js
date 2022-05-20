import React from 'react';
import SymptomList from './'

import { render, screen, stores, fireEvent } from '../../../Utility/test-utils'

//This attaches the class containing the API fetch requests to the stores
//Doing it this way allows you to swap in other data retrival methods for testing


it('renders using render function without errror', () => {
    stores.patientStore.initalize();
    render(<SymptomList />)
});

test('selects symptom when clicked on label', async () => {
    stores.patientStore.initalize();
    const { container } = render(<SymptomList />)
    const checkbox = container.querySelector("#nausea")
    expect(checkbox).toBeTruthy()
    await fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(stores.patientStore.report.selectedSymptoms.length).toBe(1)
});


