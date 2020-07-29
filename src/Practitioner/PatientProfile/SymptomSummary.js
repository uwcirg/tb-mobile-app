import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';
import Styles from '../../Basics/Styles';


const useStyles = makeStyles({
  container:{
      padding: "1em",
      flexBasis: "33%",
      flexGrow: 1,
      backgroundColor: "white",
  }
})

const SymptomSummary = () => {

    const classes = useStyles();
    const { practitionerStore } = useStores();
    const { t, i18n } = useTranslation('translation');


    return(
    <div className={classes.container}>
        <Typography variant={"h2"}>Symptoms</Typography>
        <p><span className={classes.bold}>{t("coordinator.patientProfile.phoneNumber")}: </span>{practitionerStore.selectedPatient.details.phoneNumber}</p>

    </div>)

}

export default SymptomSummary;