import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
//import Colors from '../Basics/Colors'
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    container: {
        minHeight: "200px",
        width: "50%",
        border: "1px solid lightgray",
        borderRadius: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    superContainer: {

    },
    lineItem: {
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
        fontSize: "1.25em"
    },
    checkbox:{
        
    }
})

const HomePageCard = (props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const handleClick = (id,type) => {  
        props.setSidebar(id,type)
    }

    const patientList = props.patientList.map( (each,index) => {
        return (<SingleLine id={each.id} key={`${each.type}-${each.id}`} onClick={() => handleClick(index,props.type)} fullName={each.fullName} />)
    })

    return (
        <div className={classes.superContainer}>
            <h1 className={classes.title}>{props.title}</h1>
            <div className={classes.container}>
                {patientList}
            </div>
        </div>
    )
}

const SingleLine = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.lineItem} onClick={props.onClick}>
            <Checkbox color="default" className={classes.checkbox} checked={false} />
            <div>{props.fullName}</div>
            <div></div>
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