import { Box, Typography, Card, withStyles, Select, MenuItem, TextField, Grid, makeStyles, InputBase } from '@material-ui/core';
import React, { useState } from 'react';
import PopOverV2 from '../PopOverV2';
import { useHistory } from 'react-router-dom';
import ReminderMenu from '../../../Patient/Home/Reminder/ReminderMenu';
import { useTranslation } from 'react-i18next';
import { KeyboardArrowDown } from '@material-ui/icons';
import FlatButton from '../../FlatButton';

const useStyles = makeStyles({
    select: {
        padding: "16px"
    },
    selectRoot: {
        border: "none",
        width: "100%",
        display: "block",
        display: "flex"
    },
    selectIcon:{
        top: "unset",
        right: ".5rem",
        fontSize: "2em",
    }
})


export default function AddApointment() {


    const [state, setState] = useState({
        category: "",
        time: null
    })

    const history = useHistory();

    return (
        <PopOverV2 handleExit={() => { history.push("/") }} open topBarTitle={"Add Appointment"}>
            <Box padding="16px 8px">
                <Section title='What type of appointment is this?'>
                    <TypeSelect value={state.category} handleChange={(value) => {
                        setState({ ...state, category: value })
                    }} />
                </Section>
                <Section title="Add a note">
                    <TextField variant='outlined' />
                </Section>
                <Box height="16px" />
                <Grid container>
                    <Box flexGrow={1} />
                    <FlatButton>Create Appointment</FlatButton>
                </Grid>
            </Box>
        </PopOverV2 >
    )
}

const Section = ({ title, children }) => {
    return (<SectionCard>
        <Box padding="16px">
            <SectionTitle>{title}</SectionTitle>
            <Box padding="8px 0">
                {children}
            </Box>
        </Box>
    </SectionCard>)
}

const SectionTitle = withStyles({
    root: {
        fontSize: "1.125rem",
        fontWeight: "bold"
    }
})(Typography)

const SectionCard = withStyles({
    root: {
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)"
    }
})(Card)

const TypeSelect = ({ value, handleChange }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const categories = Object.keys(t('appointments.types', { returnObjects: true }));

    return (
        <Select
            displayEmpty
            variant='outlined'
            className={classes.selectRoot}
            classes={{
                outlined: classes.select,
                icon: classes.selectIcon
            }}
            IconComponent={KeyboardArrowDown}
            labelId="select-appointment-type"
            id="appointment-type"
            value={value}
            onChange={(e) => { handleChange(e.target.value) }}>
            <MenuItem value="" disabled>Select an appointment type</MenuItem>
            {categories.map((each) => <MenuItem key={`category-${each}`} value={each}>{t(`appointments.types.${each}`)}</MenuItem>)}
        </Select>
    )
}