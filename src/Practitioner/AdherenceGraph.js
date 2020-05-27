import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react';
import useStores from '../Basics/UseStores';


const useStyles = makeStyles({
  container:{
      width: "200px",
      height: "200px",
      display: "flex"
  },
  column:{
      border: "solid 1px black",
      position: "relative",
      width: "100px"
  },
  box:{
      height: "5px",
      width: "5px",
      backgroundColor: "red",
      position: "absolute"
  }
})

const Adherence = observer(() => {

    const {practitionerStore} = useStores();
    const classes = useStyles();

    useEffect(()=>{
        practitionerStore.getPatientsTest();
    },[])

    return(
    <div className={classes.container}>
        {practitionerStore.testPatients.map(each => {
            return <div className={classes.column}>
                <div style={{bottom: `${each.adherence * 100}%`}} className={classes.box}> </div>
                </div>
        })}
    </div>)

});

export default Adherence;