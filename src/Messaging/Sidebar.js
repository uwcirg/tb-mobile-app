import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import {observer} from 'mobx-react'
import PatientPicture from '../Basics/PatientIcon'
import Profile from '../Practitioner/Shared/PatientProfile';

const useStyles = makeStyles({
  container:{
      display: "flex",
      flexDirection: "column"
  }
})

const PatientMessageSidebar = observer(() => {

    const classes = useStyles();
    const {messagingStore} = useStores();

    const id = messagingStore.coordinatorSelectedChannel && messagingStore.coordinatorSelectedChannel.userId

    return(<div className={classes.container}>
        {id && <Profile id={id} />}
    </div>)

})

export default PatientMessageSidebar;