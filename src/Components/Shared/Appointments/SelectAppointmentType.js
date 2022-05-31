import React from 'react';
import { Select, MenuItem, makeStyles } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import Colors from '../../../Basics/Colors';

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
    }
})



const SelectAppointmentType = ({ value, handleChange }) => {

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

export default SelectAppointmentType;