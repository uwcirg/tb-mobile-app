import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import Priority from '../Shared/Priority';
import IconButton from '@material-ui/core/IconButton'
import Down from '@material-ui/icons/KeyboardArrowDown'
import Up from '@material-ui/icons/KeyboardArrowUp'

const useStyles = makeStyles({
    row:{
        height: "60px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    priority:{

    },
    name:{
        flexBasis: "120px",
        padding: ".5em"
    },
    container:{
        height: props => props.expanded ? "100px" : "60px",
        boxShadow: "0px 4px 16px rgba(204, 188, 252, 0.15)",
        backgroundColor: "white",
        marginBottom: "1em"
    }
  
})

const Row = (props) => {
    const [expanded,setExpanded] = useState(false);
    const {patient} = props;
    const classes = useStyles({columns: props.columns, expanded: expanded});

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    return(
    <div className={classes.container}>
    <div className={classes.row}> 
        <IconButton onClick={toggleExpanded}>{expanded ? <Up /> : <Down /> }</IconButton>
        <div className={classes.name}>{patient.fullName}</div>
        <div className={classes.priority}><Priority index={patient.priority} /></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>
        </div>
        )

}

export default Row;