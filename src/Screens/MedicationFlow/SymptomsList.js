import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import Checkbox from '@material-ui/core/Checkbox';
import {observer} from 'mobx-react'
import useStores from '../../Basics/UseStores';

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
"sore_belly",
"yellow_coloration",
"difficulty_breathing",
"facial_swelling"
]

const SymptomsList = observer(() => {

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

    const List = Symptoms.map( (name,index) => {
        return(
            <SingleSymptom id={name + index}>
                <div> </div>
                <div>
                    <span> {t(`symptoms.${name}.title`)} </span> <br />
                    <span> {t(`symptoms.${name}.subtitle`)} </span>
                </div>
                <Checkbox
                        id={name}
                        checked={patientStore.selectedSymptoms.includes(name)}
                        style={{marginLeft: "auto",marginRight:"1em"}}
                        value="secondary"
                        color="primary"
                        inputProps={{ 'aria-label': `${name} checkbox` }}
                        onChange={handleSelection}
                />
            </SingleSymptom>
        )
    })

    return (
        <ListContainer>
        {List}
        </ListContainer>
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