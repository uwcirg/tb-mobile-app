import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Details from '@material-ui/icons/KeyboardArrowDown';
import Row from './Row'

const COLUMNS = ["name","priority","submitted","symptoms","feeling","medication","strip","action"]

const useStyles = makeStyles({
    table:{
        width: "100%",
        minHeight: "200px"
    },
    tableTitles:{ 
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1em"
    },
    title:{
        fontSize: "1em",
        textTransform: "capitalize"
    }
  
})


const Table = observer(() => {

    const classes = useStyles();
    const {practitionerStore} = useStores();

    return(<div className={classes.table}>
        <Titles />
        <>
        {practitionerStore.patientList.map( patient => {
            return (<Row columns={COLUMNS} patient={patient} />)
        })}
        </>
    </div>)

})


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