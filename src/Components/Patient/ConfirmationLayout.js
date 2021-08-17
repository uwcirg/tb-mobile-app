import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import Styles from '../../Basics/Styles';
import { ReactComponent as DoctorIcon } from '../../Basics/Icons/doctor.svg';
import CheckIcon from '@material-ui/icons/Check';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    confirmation: {
        ...Styles.flexRow,
        marginBottom: "1em",
        alignItems: "flex-end",
    },
    confirmationText: {
        ...Styles.flexColumn,
        paddingLeft: "1em",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "50%",
        height: "100%",
        textAlign: "left",
    },
    confirmationHeader: {
        ...Styles.flexRow,
        fontSize: "1.25em",
        margin: 0,
        "& > svg": {
            color: Colors.approvedGreen,
            marginLeft: ".5em"
        }
    },
})

const CompName = ({title,subtitle}) => {

    const classes = useStyles();

    return (<div className={classes.confirmation}>
        <DoctorIcon />
        <div className={classes.confirmationText}>
            <div className={classes.confirmationHeader}>{title}<CheckIcon /></div>
            <p>{subtitle}</p>
        </div>
    </div>)

}

export default CompName;