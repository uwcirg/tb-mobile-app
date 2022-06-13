import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicationReminderCard from '../Home/MedicationReminder'



export default function MedicationReminder(){
    
    const { t } = useTranslation('translation');

    return(
        <Box padding="2rem 1rem">
            <MedicationReminderCard />
        </Box>
    )
}