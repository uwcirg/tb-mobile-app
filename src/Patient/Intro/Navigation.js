import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles({
  container:{
      padding: "1em",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "black",
      borderRadius: "1em",
      width: "90vw",
      boxSizing: "border-box",
      margin: 'auto'
  },
  item:{
    display: "flex",
    width: "100%"

  }
})

const NavInfo = () => {

    const classes = useStyles();

    return(
    <div className={classes.container}>
        <Item />
        <Item />
        <Item />
        <Item />
    
    </div>)

}

const Item = (props) =>{
    const classes = useStyles();
    return( <div className={classes.item}>
        <HomeIcon />
        Home Page

    </div>)

}

export default NavInfo;