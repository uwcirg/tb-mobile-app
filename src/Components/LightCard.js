import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Styles from '../Basics/Styles'

const useStyles = makeStyles({
  lightCard:{
    ...Styles.profileCard
  }
})

const LightCard = (props) => {
  const {children, className} = props;
    const classes = useStyles();

    return(<div {...props} className={`${classes.lightCard} ${className}`}>
        {children}
    </div>)

}

export default LightCard;