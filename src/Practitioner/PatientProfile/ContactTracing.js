import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react';
import SectionLabel from '../../Components/SectionLabel';

const useStyles = makeStyles({
  container:{
      padding: "1em"
  }
})

const ContactTracing = () => {

    const classes = useStyles();

    return(<div className={classes.container}>
        <SectionLabel>Contact Tracing</SectionLabel>
    </div>)

}

export default ContactTracing;