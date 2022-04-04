import React from 'react';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import useStyles from './styles';

import ExpansionPanel from '../../../Basics/ExpansionPanel';
import ConfirmationLayout from '../../../Components/Patient/ConfirmationLayout';

import { Edit } from '@material-ui/icons';
import Colors from '../../../Basics/Colors';

import Review from './ReviewSubmission';
import ReviewPhotos from './ReviewPhotos';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';

const Confirmation = observer(() => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { patientStore } = useStores();

    return (
        <div className={classes.confirmationSuperContainer}>
            <ConfirmationLayout title={t("patient.home.completed.title")} subtitle={t("patient.home.completed.subtitle")} />
            {patientStore.todaysReportHasIssue && <p style={{
                textAlign: "center",
                backgroundColor: `${Colors.highlightYellow}`,
                borderRadius: "5px",
                padding: ".5em"
            }}>{t('patient.home.completed.issue')}</p>}
            <ExpansionPanel
                previewClassName={classes.reportPreview}
                preview={t("patient.reportConfirmation.viewOrEdit")}
                icon={<Edit style={{ fontSize: "1em" }} />}>
                <Review />
            </ExpansionPanel>
            <Box paddingTop="1em">
                <ReviewPhotos />
            </Box>
        </div>
    )
})

export default Confirmation;