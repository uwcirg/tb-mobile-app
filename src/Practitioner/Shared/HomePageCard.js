import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
//import Colors from '../Basics/Colors'
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    container: {
        minHeight: "200px"
    },
    superContainer: {

    },
    lineItem: {
        minHeight: "50px",
        borderTop: "solid 1px lightgray",
        "&:first-of-type":{
            borderTop: "none"
        },
        display: "flex",
        alignItems: "center"
    },
    title:{
        fontSize: "1.25em"
    },
    checkbox:{
        
    }
})

const HomePageCard = (props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const patientList = props.patientList.map(each => {
        return (<SingleLine fullName={each.fullName} />)
    })

    return (
        <div className={classes.superContainer}>
            <h1 className={classes.title}>Patients With Symptoms</h1>
            <div className={classes.container}>
                {patientList}
            </div>
        </div>
    )
}

const SingleLine = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.lineItem}>
            <Checkbox color="black" className={classes.checkbox} checked={true} />
            <div>{props.fullName}</div>
            <div></div>
        </div>
    )
}

HomePageCard.propTypes = {
    patientList: PropTypes.array,
    onComplete: PropTypes.func
};

SingleLine.propTypes = {
    fullName: PropTypes.string.isRequired
};


export default HomePageCard;