import React from 'react';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import useStyles from './styles';
import ConfirmationLayout from '../../../Components/Patient/ConfirmationLayout';
import Edit from '@material-ui/icons/Edit';
import ReviewPhotos from './ReviewPhotos';
import { useTranslation } from 'react-i18next';
import { Box, Collapse, Typography } from '@material-ui/core';
import CompletionButton from './CompletionButton';
import Review from './ReviewSubmission';
import useToggle from '../../../Hooks/useToggle';

const Confirmation = observer(() => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { patientStore } = useStores();

    const [showEdit,toggleEdit] = useToggle(false);

    return (
        <div className={classes.confirmationSuperContainer}>
            <ConfirmationLayout title={t("patient.home.completed.title")} subtitle={t("patient.home.completed.subtitle")} />
            {patientStore.todaysReportHasIssue && <Typography className={classes.reportIssueText}>{t('patient.home.completed.issue')}</Typography>}
            <CompletionButton icon={<Edit />} text={t('patient.reportConfirmation.viewOrEdit')} onClick={toggleEdit} />
            <Collapse in={showEdit}>
                <Review />
            </Collapse>
            <Box height="1em" />
            <ReviewPhotos />
        </div>
    )
})

export default Confirmation;