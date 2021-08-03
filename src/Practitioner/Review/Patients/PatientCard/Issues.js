import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../../Basics/UseStores';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import Colors from '../../../../Basics/Colors';
import ProfileButton from '../../../../Components/FlatButton.js';
import Check from '@material-ui/icons/Check';
import { useTranslation } from 'react-i18next';



const issueStyles = makeStyles({
    issues: {
        height: "auto",
        display: "flex",
        flexDirection: "column",
        borderLeft: `1px solid ${Colors.gray}`,
        minWidth: "175px",
        "& > h3": {
            fontSize: "1.25em"
        }
    },
    labels:{
        flex: "1 1 0",
        height: "auto",
        "& > p": {
            color: Colors.red
        }
    },
    resolve:{
        display: "flex",
        justifyContent: "center"
    }
})


const checkForPatientIssue = (type, id) => {
    return type && type.map((each) => {
        return parseInt(each.patientId)
    }).includes(id)

}

const Issues = observer((props) => {

    const { t } = useTranslation('translation');
    const classes = issueStyles();
    const { practitionerStore } = useStores();

    //TODO - very inneficient way of looping through these results
    //Should probably think about a way to attach all of the issue to a patient instead of doing it on the client
    const missedReport = checkForPatientIssue(practitionerStore.filteredPatients.missed, props.id)
    const needsSupport = checkForPatientIssue(practitionerStore.filteredPatients.support, props.id)
    const missedPhoto = checkForPatientIssue(practitionerStore.filteredPatients.missedPhoto, props.id)
    const hadSymptoms = checkForPatientIssue(practitionerStore.filteredPatients.symptom,props.id)

    //console.log(toJS(practitionerStore.filteredPatients))

    return (
        <div className={classes.issues}>
            <Typography variant="h3">Issues:</Typography>
            <div className={classes.labels}>
                <p>{missedReport && "MISSED REPORT"}</p>
                <p>{needsSupport && "NEEDS SUPPORT"}</p>
                <p>{missedPhoto && "MISSED PHOTO"}</p>
                <p>{hadSymptoms && "SYMPTOMS"}</p>
            </div>
            
            <div className={classes.resolve}>
            <ProfileButton onClick={()=>{console.log("Check off")}}><Check />{t("Resolve Issues")}</ProfileButton>
            </div>
        </div>
    )
});

export default Issues;