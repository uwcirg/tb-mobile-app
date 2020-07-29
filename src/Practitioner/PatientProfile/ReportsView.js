import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import Typography from '@material-ui/core/Typography';
import Styles from '../../Basics/Styles';

const useStyles = makeStyles({
    container:{
        flexGrow: "1"
    },
    report:{
        ...Styles.profileCard,
        width: "95%",
        minHeight: "75px",
        backgroundColor: "white",
        marginBottom: "1em",
        marginLeft: ".5em",

    }
  
})

const ReportView = () => {

    const classes = useStyles();

    return(<div className={classes.container}>
        <Report />
        <Report />
        <Report />
        <Report />
    </div>)

}

const Report = (props) => {
    const classes = useStyles();
    return(
    <div className={classes.report}>

    </div>
    )
}

export default ReportView;