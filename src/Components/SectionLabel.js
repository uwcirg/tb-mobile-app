import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Styles from '../Basics/Styles';

const useStyles = makeStyles({
  sectionLabel:{
      ...Styles.patientPageTitle
  }
})

const SectionLabel = (props) => {

    const classes = useStyles();

    return(<Typography className={`${classes.sectionLabel} ${props.className}`} variant="h2" color="initial">{props.children}</Typography>)

}

export default SectionLabel;