import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Styles from '../../Basics/Styles';



const useStyles = makeStyles({
    sectionTitle:{
        ...Styles.header
    }
})

const SectionTitle = ({children,className}) => {

    const classes = useStyles();

    return(<Typography className={`${classes.sectionTitle} ${className}`} variant="h1">{children}</Typography>)

}

export default SectionTitle;