import React from 'react';
import SymptomList from './'

import { render, screen, stores, fireEvent } from '../../../Utility/test-utils'

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

it('expands subtitle when expansion button is clicked on', () => {
    stores.patientStore.initalize();
    const { getByTestId } = render(<SymptomList />)
    const dropdownButton = getByTestId('dropdown-redness')
    const subtitle = getByTestId('subtitle-redness')
    expect(dropdownButton).toBeTruthy()
    expect(subtitle).not.toBeVisible()
    fireEvent.click(dropdownButton)
    expect(subtitle).toBeVisible()
    expect(subtitle).toHaveTextContent("Swelling, redness, itching of skin")
    
})


