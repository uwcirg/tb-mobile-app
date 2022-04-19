import React from 'react';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import useStyles from './styles';
import ConfirmationLayout from '../../../Components/Patient/ConfirmationLayout';
import ProgressLinks from './ProgressLinks';
import { useTranslation } from 'react-i18next';
import { Box, Collapse, Typography } from '@material-ui/core';
import CompletionButton from './CompletionButton';
import Review from './ReviewSubmission';
import useToggle from '../../../Hooks/useToggle';

import { KeyboardArrowDown, KeyboardArrowUp, Edit } from '@material-ui/icons';

const Confirmation = observer(() => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { patientStore } = useStores();

    const [showEdit, toggleEdit] = useToggle(false);

    return (
        <div className={classes.confirmationSuperContainer}>
            <ConfirmationLayout title={t("patient.home.completed.title")} subtitle={t("patient.home.completed.subtitle")} />
            {patientStore.todaysReportHasIssue && <>
                <Box height=".5em" />
                <Typography className={classes.reportIssueText}>{t('patient.home.completed.issue')}</Typography>
            </>}
            <Box height=".5em" />
            <CompletionButton
                arrowIcon={showEdit ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                icon={<Edit />}
                text={t('patient.reportConfirmation.viewOrEdit')}
                onClick={toggleEdit} />
            <Collapse in={showEdit}>
                <Box paddingTop="1em">
                    <Review />
                </Box>
            </Collapse>
            <Box height="1em" />
            <ProgressLinks />
        </div>
    )
})

export default Confirmation;