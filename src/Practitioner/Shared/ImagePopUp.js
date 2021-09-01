import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import PopOver from './PopOver'

const useStyles = makeStyles({
  image:{
      height: "80vh",
      maxWidth: "90vw"
  }
})

const ImagePopUp = (props) => {

    const classes = useStyles();

    return(<PopOver close={props.close} fullWidth>
        <img className={classes.image} src={props.imageSrc} />
    </PopOver>)

}

export default ImagePopUp;