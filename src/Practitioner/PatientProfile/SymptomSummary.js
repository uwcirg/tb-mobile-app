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
import { ReactComponent as DoctorIcon } from '../../Basics/Icons/doctor.svg';
import SectionLabel from '../../Components/SectionLabel';

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
        padding: "1em"
    },
    menuItem: {
        textTransform: "capitalize"
    },
    top: {
        display: "flex",
        alignItems: "center",
        "& > h2": {
            ...Styles.patientPageTitle,
            margin: "0",
            marginRight: "auto"
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
        width: "70%",
    },
    select: {
        fontSize: ".875em",
        "& > div": { padding: ".5em" }
    },
    noSymptoms: {
        width: "100%",
        ...Styles.flexColumn,
        alignItems: "center",
        textAlign: "center",
        "& > p": { 
            width: "70%",
        textTransform: "capitalize"
    }
    },
    totalContainer:{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        "& > div.total":{
            padding: "1em",
            alignSelf: "center",
            "& > p":{
                textAlign: "center",
                margin: 0,
                padding: 0,
                textTransform: "capitalize"
            },
            ...Styles.flexColumn,
            "& > p:nth-of-type(2)":{
                fontWeight: "bold"
            },
            "& > p:nth-of-type(1)":{
                fontSize: "2em"
            },
            
        }
    }
})

const SymptomSummary = observer(() => {

    const classes = useStyles();
    const symptomSummary = useStores().patientProfileStore.selectedPatient.symptomSummary
    const { t } = useTranslation('translation');
    const [selection, setSelection] = useState("week");

    const options = ["week", "month", "all"]

    const handleChange = (event) => {
        setSelection(event.target.value);
    }

    const list = Object.keys(symptomSummary).length > 0 ? Object.keys(symptomSummary[selection]) : []
    const total = list.length > 0 ? Object.values(symptomSummary[selection]).reduce((acc, cur) => { return acc + cur }) : 0

    return (
        <div className={classes.container}>
            <div className={classes.top}>
                <SectionLabel>{t('commonWords.symptoms')}</SectionLabel>
                <Select
                    className={classes.select}
                    variant="outlined"
                    labelId="interval-select-label"
                    id="interval-select"
                    value={selection}
                    onChange={handleChange}
                >
                    {options.map((each,index) => {
                        return <MenuItem key={`symotom-summary-${index}`} value={each}><span className={classes.menuItem}>{t(`coordinator.patientProfile.symptomSummary.timeOptions.${each}`)}</span></MenuItem>
                    })}

                </Select>
            </div>

                {total > 0 ? <div className={classes.totalContainer}><div className={classes.barContainer}> {list.sort( (a,b) =>{return symptomSummary[selection][b] - symptomSummary[selection][a]}).map(each => {
                    const value = symptomSummary[selection][each]
                    return (symptomSummary[selection][each] > 0 ? <>
                        <div className={classes.barLabel}><p>{t(`symptoms.${each}.title`)}</p> <p>{value}</p></div>
                        <BorderLinearProgress severe={SevereSymptoms.includes(each)} variant="determinate" value={(value / total) * 100} />
                    </> : "")
                })} </div> <div className="total"><p>{total}</p><p>{t('commonWords.total')}</p></div> </div> : <NoSymptoms />}
            </div>)
});

const NoSymptoms = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    return (
        <div className={classes.noSymptoms}>
            <DoctorIcon />
            <p>{t('coordinator.patientProfile.symptomSummary.noneReported')}</p>
        </div>
    )
}

export default SymptomSummary;