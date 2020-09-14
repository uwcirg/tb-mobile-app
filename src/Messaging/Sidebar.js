import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import {observer} from 'mobx-react'
import Profile from '../Practitioner/Shared/PatientProfile';

const useStyles = makeStyles({
  container:{
      height: "100%",
      width: "100%",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      "& > div":{
          marginTop: "4em"
      }
  }
})

const PatientMessageSidebar = observer(() => {

    const classes = useStyles();
    const {messagingStore} = useStores();

    const id = messagingStore.coordinatorSelectedChannel && messagingStore.coordinatorSelectedChannel.userId

    return(<div className={classes.container}>
        {id != 0 ? <Profile id={id} /> : <p> Loading</p>}
    </div>)

})

export default PatientMessageSidebar;