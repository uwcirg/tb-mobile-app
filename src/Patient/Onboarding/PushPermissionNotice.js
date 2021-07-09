import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PushFeatureList from '../Information/PushFeatureList'

const useStyles = makeStyles({
  container:{
      padding: "1em"
  }
})

const AskPermissions = () => {
    const classes = useStyles();
    return(<div className={classes.container}>
        <NotificationsActiveIcon />
        <h4>The next step will ask you to turn on notifications</h4>
        <p>This allows us to send you:</p> 
        <PushFeatureList />
    </div>)
}


export default AskPermissions;