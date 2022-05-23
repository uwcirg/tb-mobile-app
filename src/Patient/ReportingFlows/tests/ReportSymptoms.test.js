import React from 'react';
import { render, stores, fireEvent } from '../../../Utility/test-utils'
import ReportSymptoms from '../ReportSymptoms';


describe('Symptoms reporting survey', () => {

    beforeEach(() => {
        stores.patientStore.initalize();
    })


    it('renders without error', () => {
        render(<ReportSymptoms />)
    });

    it('renders a symptom list', () => {
        const { getByTestId } = render(<ReportSymptoms />)
        const symptomList = getByTestId('all-symptoms-list')
        expect(symptomList).toBeInTheDocument()
    })

    it('displays nausea popup when selected', async () => {
        const { getByTestId, queryByTestId} = render(<ReportSymptoms />)
        let nauseaPopup = queryByTestId('nausea-selections')
        expect(nauseaPopup).toBeNull()
        const nauseaCheckbox = getByTestId('checkbox-nausea')
        await fireEvent.click(nauseaCheckbox)
        nauseaPopup = queryByTestId('nausea-selections')
        expect(nauseaPopup).toBeTruthy()
    })

})

