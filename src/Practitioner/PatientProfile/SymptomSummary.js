import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';
import Styles from '../../Basics/Styles';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import Colors from '../../Basics/Colors';
import { SevereSymptoms } from '../../Basics/SymptomsSeperation';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 16,
        borderRadius: 10.5,
    },
    colorPrimary: {
        backgroundColor: Colors.lightgray,
    },
    bar: {
        borderRadius: 10.5,
        backgroundColor: props => props.severe ? '#EB5757' : '#F2C94C',
    },
}))(LinearProgress);

const useStyles = makeStyles({
    container: {
        padding: "1em 1.5em 1.5em 1.5em",
        flexBasis: "33%",
        flexGrow: 1,
        backgroundColor: "white",
    },
    menuItem: {
        textTransform: "capitalize"
    },
    top: {
        display: "flex",
        alignItems: "center",
        "& > h2": {
            margin: "0 auto 0 0",
            ...Styles.patientPageTitle
        }
    },
    barLabel: {
        display: "flex",
        "& > p:first-of-type": {
            marginRight: "auto"
        },
        "& > p:nth-of-type(2)": {
            fontWeight: "bold"
        },

        "& > p": {
            color: Colors.textDarkGray,
            fontSize: ".875em",
            marginBottom: ".25em"
        }
    },
    barContainer: {
        width: "80%",
    },
    select:{
        fontSize: ".875em",
        "& > div": {padding: ".5em"}
    }
})

const SymptomSummary = observer(() => {

    const classes = useStyles();
    const symptomSummary = useStores().practitionerStore.selectedPatient.symptomSummary
    const { t, i18n } = useTranslation('translation');
    const [selection, setSelection] = useState("week");

    const options = ["week", "month", "all"]

    const handleChange = (event) => {
        setSelection(event.target.value);
    }

    const list = Object.keys(symptomSummary).length > 0 ? Object.keys(symptomSummary[selection]) : []
    const total = list.length > 0 ? Object.values(symptomSummary[selection]).reduce((acc, cur) => { return acc + cur }) : 0

    return (
        <div className={classes.container}>
            <Typography variant={"h2"}>Symptoms</Typography>

            <Select
                className={classes.select}
                variant="outlined"
                labelId="interval-select-label"
                id="interval-select"
                value={selection}
                onChange={handleChange}
            >
                {options.map(each => {
                    return <MenuItem value={each}><span className={classes.menuItem}>{t(`coordinator.patientProfile.symptomSummary.timeSelect.${each}`)}</span></MenuItem>
                })}

            </Select>

            <div className={classes.barContainer}>
                {list.map(each => {
                    const value = symptomSummary[selection][each]
                    return (symptomSummary[selection][each] > 0 ? <>
                        <div className={classes.barLabel}><p>{t(`symptoms.${each}.title`)}</p> <p>{value} | {total}</p></div>
                        <BorderLinearProgress severe={SevereSymptoms.includes(each)} variant="determinate" value={(value / total) * 100} />
                    </> : "")
                })}
            </div>

        </div>)

});

export default SymptomSummary;