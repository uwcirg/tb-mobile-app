import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import {observer} from 'mobx-react'
import useStores from '../../Basics/UseStores';


import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { observe } from 'mobx';


/*
Object that maps all symptoms to strings which are used to fetch thier locations
Translations are stored in public/locales/ in their resective lanugates folder

They will be built as strings following this format:

nausea: {
    title: "symptoms.nausea.title",
    subtitle: "symptoms.nausea.subtitle"
}

*/

const Symptoms = [ 
"nausea",
"redness", 
"hives", 
"fever", 
"appetite_loss", 
"blurred_vision",

]

const SevereSymptoms = [
"sore_belly",
"yellow_coloration",
"difficulty_breathing",
"facial_swelling"
]


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  panel:{
    boxShadow: "none",
    border: "none",
    padding: 0,
    margin: 0,
    justifyContent: "flex-start",
    width: "100%",
   
  },
  summary:{
      "& > div":{
          marginTop: "0",
          marginBottom: "0",
          paddingTop: ".25em",
          paddingBottom: ".25em"
      }

  },
  check:{
      
  }
});

const Symptom = observer((props) => {
    const classes = useStyles();
    const {patientStore} = useStores();

    const handleSelection = (e) => {
        let symptomName = e.target.id
  
         let index = patientStore.selectedSymptoms.indexOf(symptomName);
 
         if( index === -1){
             patientStore.selectedSymptoms.push(symptomName);
         }else{
             patientStore.selectedSymptoms.splice(index,1);
         }
 
     }

    const check = (
    <Checkbox
        id={props.name}
        checked={patientStore.selectedSymptoms.includes(props.name)}
        style={{marginLeft: "auto",marginRight:"1em"}}
        value="secondary"
        color="primary"
        inputProps={{ 'aria-label': `${name} checkbox` }}
        onChange={handleSelection}
    />
)

    return(
        <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={check}
            label={props.title}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography color="textSecondary">
              {props.subtitle}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
});


const SymptomsList = observer((props) => {

    const {patientStore} = useStores();
    const {t, i18n} = useTranslation('translation');

    const handleSelection = (e) => {
       let symptomName = e.target.id
 
        let index = patientStore.selectedSymptoms.indexOf(symptomName);

        if( index === -1){
            patientStore.selectedSymptoms.push(symptomName);
        }else{
            patientStore.selectedSymptoms.splice(index,1);
        }

    }

    let selectedList = props.severe ? SevereSymptoms : Symptoms;

    const List = selectedList.map( (name,index) => {
        return(
            <Symptom name={name} subtitle={t(`symptoms.${name}.subtitle`)} title={t(`symptoms.${name}.title`)} />
        )
    })

    return (
        <>
        {List}
        </>
    )
});

const ListContainer = styled.div`
height: 50vh;
overflow-y: scroll;
overflow-x: hidden;
`

const SingleSymptom = styled.div`
border-bottom: solid 1px lightgray;
padding: .5em;
display: flex;
width: 100%;
margin: auto;

div:first-of-type{
    width: 30px;
    height: 30px;
    background-color: lightgray;
    border-radius: 15px;
    margin-right: 1em;
    margin-left: 1em;
}

span:first-of-type{
    font-weight: 500;
}

span:nth-of-type(2){
    color: gray;
    font-size: .75em;
}


`
export default SymptomsList;