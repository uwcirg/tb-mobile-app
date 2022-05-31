import React, { useState } from 'react';
import PopOverV2 from '../PopOverV2';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, withStyles, Select, MenuItem, TextField, Grid, makeStyles } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import FlatButton from '../../FlatButton';
import TimeInput from './TimeInput';
import Colors from '../../../Basics/Colors';
import DateInput from './DateInput';
import { DateTime } from 'luxon';

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
    selectIcon: {
        top: "unset",
        right: ".5rem",
        fontSize: "2em",
        color: Colors.textDarkGray
    },
    createButton: {
        fontSize: "1rem"
    }
})


export default function AddAppointment() {

    const { t } = useTranslation('translation');

    const classes = useStyles();

    const [state, setState] = useState({
        category: "",
        time: null,
        note: "",
        datetime: DateTime.local().toISO(),
        tempDatetime: DateTime.local().toISO()
    })

    const history = useHistory();
    const disableSubmit = !state.category;

    const handleDateChange = (dt) => {
        const tempDT = dt.set({ hour: state.datetime.hour, minute: state.datetime.minute }).startOf('minute')
        setState({ ...state, datetime: tempDT.toISO() })
    }

    const handleTimeChange = (newTime) => {
        const tempDT = DateTime.fromISO(state.datetime).set({ hour: newTime.hour, minute: newTime.minute }).startOf('minute')
        setState({ ...state, datetime: tempDT.toISO() })
    }

    return (
        <PopOverV2 handleExit={() => { history.push("/") }} open topBarTitle={t('appointments.addAppointment')}>
            <Box padding="16px 8px">
                <Section title={t('appointments.typeQuestion')}>
                    <TypeSelect value={state.category} handleChange={(value) => {
                        setState({ ...state, category: value })
                    }} />
                </Section>
                <Section title={t('coordinator.patientProfile.options.note')}>
                    <TextField
                        value={state.note}
                        onChange={(e) => { setState({ ...state, note: e.target.value }) }}
                        placeholder={t('appointments.typeNote') + '...'}
                        multiline fullWidth variant='outlined' />
                </Section>

                <Section title={t('appointments.whatDay')}>
                    <DateInput value={state.datetime} setValue={handleDateChange} />
                </Section>

                <Section title={t('appointments.whatTime')}>
                    <TimeInput value={state.datetime} setValue={handleTimeChange} />
                </Section>
                <Box height="16px" />
                <Grid container>
                    <Box flexGrow={1} />
                    <FlatButton disabled={disableSubmit} className={classes.createButton}>{t('appointments.createAppointment')}</FlatButton>
                </Grid>
            </Box>
            <Box height="2rem" aria-hidden />
        </PopOverV2 >
    )
}

const Section = ({ title, children }) => {
    return (
        <>
            <SectionCard>
                <Box padding="16px">
                    <SectionTitle>{title}</SectionTitle>
                    <Box padding="8px 0">
                        {children}
                    </Box>
                </Box>
            </SectionCard>
            <Box height="16px" />
        </>
    )
}

const SectionTitle = withStyles({
    root: {
        fontSize: "1.125rem",
        fontWeight: "bold"
    }
})(Typography)

const SectionCard = withStyles({
    root: {
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
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
            <MenuItem value="" disabled>{t('appointments.select')}</MenuItem>
            {categories.map((each) => <MenuItem key={`category-${each}`} value={each}>{t(`appointments.types.${each}`)}</MenuItem>)}
        </Select>
    )
}