import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Styles from '../Basics/Styles'

const useStyles = makeStyles({
  lightCard:{
    ...Styles.profileCard
  }
})

const LightCard = ({children, className}) => {

    const classes = useStyles();

    return(<div className={`${classes.lightCard} ${className}`}>
        {children}
    </div>)

}

export default LightCard;