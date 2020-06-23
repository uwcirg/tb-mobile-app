import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
//import Colors from '../Basics/Colors'
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Colors from '../../Basics/Colors';
import Card from './Card'

const useStyles = makeStyles({
    container: {
        minHeight: "50px",
        width: "100%",
        borderRadius: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    superContainer: {
        backgroundColor: Colors.lightgray,
        borderRadius: "1em",
        width: "50%",
        marginTop: "1em",
        overflow: "hidden",
        border: "solid 1px lightgray",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"
    },
    lineItem: {
        backgroundColor: "white",
        "&:hover": {
            backgroundColor: "#cce6ff",
            "& > div": {
                fontWeight: "medium"
            }
        },
        minHeight: "50px",
        borderTop: "solid 1px lightgray",
        "&:first-of-type": {
            borderTop: "none"
        },
        "&:last-of-type":{
            borderRadius: "0 0 1em 1em"
        },
        display: "flex",
        alignItems: "center",
        "& > p": {
            marginLeft: "2em"
        }
    },
    title: {
        margin: "0 0 0 1em",
        display: "flex",
        alignItems: "center",
        "& > h2": {
            marginLeft: ".5em",
            fontSize: "1.25em"
        }
    },
    selected: {
        backgroundColor: "#cce6ff"
    }
})

const HomePageCard = (props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const handleClick = (id, type, patientId) => {
        props.setSidebar(id, type, patientId)
    }

    const patientList = props.patientList.map((each, index) => {
        return (<SingleLine
            selected={props.selectedType === props.type && props.selectedId === index}
            id={each.id} 
            key={`${props.type}-${index}`}
            patientId={each.id}
            onClick={() => handleClick(index, props.type, each.id)}
            fullName={each.fullName} />)
    })

    return (
        <Card icon={props.icon} title={props.title}>
            <div className={classes.container}>
                {patientList}
            </div>
        </Card>
    )
}

const SingleLine = (props) => {
    const classes = useStyles();
    return (
        <div className={`${classes.lineItem} ${props.selected ? classes.selected : ""}`} onClick={props.onClick}>
            <p>{props.fullName}</p>
        </div>
    )
}

HomePageCard.propTypes = {
    title: PropTypes.string,
    patientList: PropTypes.array,
    onComplete: PropTypes.func
};

SingleLine.propTypes = {
    fullName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
};


export default HomePageCard;