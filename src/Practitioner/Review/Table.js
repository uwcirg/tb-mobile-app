import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Details from '@material-ui/icons/KeyboardArrowDown';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    table:{
        width: "90%",
        margin: "auto",
        minHeight: "200px"
    },
    tableTitles:{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title:{
        fontSize: "1em",
        textTransform: "capitalize"
    }
  
})

const COLUMNS = ["name","priority","submitted","symptoms","feeling","medication","strip","action"]

const Table = () => {

    const classes = useStyles();

    return(<div className={classes.table}>
        <Titles />
    </div>)

}


const Titles = () => {
    const classes = useStyles();
    return(
        <div className={classes.tableTitles}>
            {COLUMNS.map( each => {
                return <Title text={each} />
            })}
        </div>
    )
}

const Title = (props) => {
    const classes = useStyles();
    return(
        <ButtonBase>
            <span className={classes.title}>{props.text}</span>
            <Details className={classes.details} />
        </ButtonBase>
    )

}

export default Table;