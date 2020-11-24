import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Button from '@material-ui/core/Button'
import Colors from '../../Basics/Colors'
import NewButton from '../../Basics/NewButton'
import Clipboard from '@material-ui/icons/Assignment'
import ColorFill from '@material-ui/icons/FormatColorFill'
import DeviceUnknown from '@material-ui/icons/DeviceUnknown'

const useStyles = makeStyles({
    button: {
        "& > span":{
            fontSize: ".8em"
        },
        width: "85%"
    },
    videoContainer:{
        width: "100%",
        display:"flex",
        flexDirection: "column",
        alignItems: "center"
    }
})

const HelpVideos = () => {

    const classes = useStyles();

    return (<div className={classes.videoContainer}>
        <NewButton className={classes.button} href="https://youtu.be/6zq6E_COEYo" icon={<Clipboard />} text="Instrucciones para hacer un reporte diaria" />
        <NewButton className={classes.button} href="https://youtu.be/3xDBB3MVmeU" icon={<ColorFill />} text="Instrucciones para hacer una prueba de las tiras reactiva" />
        <NewButton className={classes.button} href="https://youtu.be/FGLdEW7cR0k" icon={<DeviceUnknown />} text="Otras Partes de la Aplicación" />
    </div>)

}

export default HelpVideos;