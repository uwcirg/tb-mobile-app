import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    superContainer: {
        position: "relative",
        borderRadius: "1em",
        backgroundColor: "white",
        width: "90%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25);"
    },
    header: {
        display: "flex",
        borderRadius: "1em 1em 0 0",
        backgroundColor: Colors.lightgray,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: ".5em 0 .5em .5em",
        "& > h2": {
            margin: 0,
            padding: 0,
            fontSize: "1.25em",
            marginLeft: ".5em"
        }
    },
    collapse: {
        textTransform: "capitalize",
        marginLeft: "auto",
        marginRight: ".5em",
        "& > svg": {
            fontSize: "2em"
        }

    }

})

const Card = (props) => {

    const classes = useStyles(props);
    const [visible, setVisible] = useState(!props.defaultHidden);
    const { t } = useTranslation('translation');

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (<div className={`${classes.superContainer} ${props.className} `}>
        <div className={classes.header}>
            {props.icon}
            <h2>{props.title}</h2>
            {visible && props.headerChildren}
            <Button className={classes.collapse} onClick={toggleVisibility}>{!visible ? <>{t('patient.home.progress.viewAll')}<DownIcon /></>
                :
                <>{t('patient.home.progress.close')} <UpIcon /></>
            }</Button>
        </div>
        <div className={props.bodyClassName}>
            {visible && props.children}
        </div>
    </div>)

}

export default Card;