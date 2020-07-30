import React,{useState} from 'react'
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

const SymptomSummary = observer(() => {

    const classes = useStyles();
    const symptomSummary = useStores().practitionerStore.selectedPatient.symptomSummary
    const { t, i18n } = useTranslation('translation');
    const [selection,setSelection] = useState("week");

    const options = ["week","month","all"]

    return(
    <div className={classes.container}>
        <Typography variant={"h2"}>Symptoms</Typography>

       {Object.keys(symptomSummary).length > 0 && Object.keys(symptomSummary[selection]).map(each => {
           return (symptomSummary[selection][each] > 0 ? <p>{t(`symptoms.${each}.title`)}: {symptomSummary[selection][each]} </p> : "")
       })}

    </div>)

});

export default SymptomSummary;