import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InteractionCard from '../../Basics/InteractionCard'
import CheckIcon from '@material-ui/icons/Check';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';

import LinearProgress from '@material-ui/core/LinearProgress';
import useStores from '../../Basics/UseStores';

import {observer} from 'mobx-react'
import ClickableText from '../../Basics/ClickableText';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    textContainer:{
        ...Styles.flexRow,
        alignItems: "center",
        width: "90%",
        fontWeight: "medium",
        padding: 0,
        margin: 0
    },
    checkIcon:{
        marginLeft: "auto",
        color: Colors.approvedGreen
    },
    card:{
        padding: ".5em"
    },
    test:{
        width: "90%",
        minHeight: "1em",
    },
    clickableText:{
        fontSize: "1em",
        textAlign: "center",
        display: "block",
        margin: "1em auto .5em auto"
    }
})

const ApprovalStatus = observer(() => {

    const classes = useStyles();
    const {patientStore} = useStores();
    const numberOfPhotoReports = patientStore.numberOfPhotoReports;
    const {t, i18n} = useTranslation('translation');

    return (
        <InteractionCard className={classes.card} upperText={t("patient.progress.approvalStatus")}>
            <div className={classes.textContainer}>
                <p>{`${numberOfPhotoReports}/${numberOfPhotoReports}`} Test Strips Approved</p>
                 <CheckIcon className={classes.checkIcon}/>
            </div>
            <div className={classes.test}>
            <LinearProgress variant="determinate" color="primary" value={numberOfPhotoReports/(numberOfPhotoReports + 1) * 100} />
            <ClickableText hideIcon text="See All Photo Submissions" className={classes.clickableText}/>
            </div>
        </InteractionCard>)

});

export default ApprovalStatus;