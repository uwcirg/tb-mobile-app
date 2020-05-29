import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
//import Colors from '../Basics/Colors'
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    container: {
        minHeight: "50px",
        width: "100%",
        border: "1px solid lightgray",
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
                fontWeight: "bold"
            } 
        },
        minHeight: "50px",
        borderTop: "solid 1px lightgray",
        "&:first-of-type":{
            borderTop: "none"
        },
        display: "flex",
        alignItems: "center"
    },
    title:{
        margin: "0 0 0 1em",
        display: "flex",
        alignItems: "center",
        "& > h2": {
            marginLeft: ".5em",
            fontSize: "1.25em"
        }
    },
    checkbox:{
        
    },
    selected:{
        backgroundColor: "#cce6ff"
    }
})

const HomePageCard = (props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const handleClick = (id,type) => {  
        props.setSidebar(id,type)
    }

    const patientList = props.patientList.map( (each,index) => {
        return (<SingleLine 
            selected={props.selectedType === props.type && props.selectedId === index } 
            id={each.id} key={`${each.type}-${each.id}`} 
            onClick={() => handleClick(index,props.type)} 
            fullName={each.fullName} />)
    })

    return (
        <div className={classes.superContainer}>
            <div className={classes.title}>{props.icon ? props.icon : ""}<h2>{props.title}</h2></div>
            <div className={classes.container}>
                {patientList}
            </div>
        </div>
    )
}

const SingleLine = (props) => {
    const classes = useStyles();
    return (
        <div className={`${classes.lineItem} ${props.selected ? classes.selected : ""}`} onClick={props.onClick}>
            <Checkbox color="default" className={classes.checkbox} checked={false} />
            <div>{props.fullName}</div>
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