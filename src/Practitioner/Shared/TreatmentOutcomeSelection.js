import React from 'react'
import { treatmentOutcomes } from '../../Basics/Enums'
import { useTranslation } from 'react-i18next'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const TreatmentOutcomeSelection = ({value,setValue,className}) => {

    const { t } = useTranslation('translation');


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl variant="outlined" className={className}>
            <InputLabel id="select-treatment-outcome-label">{t('archive.treatmentOutcome')}</InputLabel>
            <Select
                labelId="select-treatment-outcome-label"
                id="select-treatment-outcome"
                value={value}
                onChange={handleChange}
                label={t('archive.treatmentOutcome')}>
                {treatmentOutcomes.map(each => {
                    return <MenuItem value={each}>{t(`archive.outcomeTypes.${each}`)}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}

export default TreatmentOutcomeSelection;