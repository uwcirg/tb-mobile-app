import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SurveyHeader from './SurveyHeader';
import { useTranslation } from 'react-i18next';
import { Input } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

const Age = (props) => {

    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const { t, i18n } = useTranslation('onboarding');

    //Limit to only reasonable ages here
    const handleChange = () => { }

    return (<div className={props.bodyClass}>
        <SurveyHeader number={2} title={t("age")} />
        <Input placeholder="Age" type="number"></Input>
    </div>)

}


export default Age;


