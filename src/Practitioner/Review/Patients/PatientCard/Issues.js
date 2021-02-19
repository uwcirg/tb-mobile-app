import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../../Basics/UseStores';
import {observer} from 'mobx-react'
import Typography from '@material-ui/core/Typography'
import Colors from '../../../../Basics/Colors'


const issueStyles = makeStyles({
    issues:{
        borderLeft: `1px solid ${Colors.gray}`,
        minWidth: "175px",
        "& > h3":{
            fontSize: "1.25em"
        },
        "& > p":{
            color: Colors.red
        }
    }
})


const checkForPatientIssue = (type,id) => {
    return type && type.map((each) =>{
        return parseInt(each.patientId)
    }).includes(id)

}

const Issues = observer((props) => {
    
    const classes = issueStyles();
    const {practitionerStore} = useStores();

    //TODO - very inneficient way of looping through these results
    //Should probably think about a way to attach all of the issue to a patient instead of doing it on the client
    const missedReport = checkForPatientIssue(practitionerStore.filteredPatients.missed, props.id)
    const needsSupport = checkForPatientIssue(practitionerStore.filteredPatients.support, props.id)
    const missedPhoto = checkForPatientIssue(practitionerStore.filteredPatients.missedPhoto, props.id)

    //console.log(toJS(practitionerStore.filteredPatients))

    return (
        <div className={classes.issues}>
            <Typography variant="h3">Issues:</Typography>
            <p>{missedReport && "MISSED REPORT"}</p>
            <p>{needsSupport && "NEEDS SUPPORT"}</p>
            <p>{missedPhoto && "MISSED PHOTO"}</p>
        </div>
    )
});

export default Issues;