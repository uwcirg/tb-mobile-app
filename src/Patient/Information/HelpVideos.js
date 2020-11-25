import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import localforage from 'localforage'
import NewButton from '../../Basics/NewButton'
import Clipboard from '@material-ui/icons/Assignment'
import ColorFill from '@material-ui/icons/FormatColorFill'
import DeviceUnknown from '@material-ui/icons/DeviceUnknown'

const CACHE_KEY = "helpVideoState";

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

function getVideoViews() {
    return localforage.getItem(CACHE_KEY).then(value => {
        return (value !== null ? value : {})
    })
}

function updateVideoState(reportID){

    return getVideoViews().then( currentState => {
        currentState[`${reportID}`] = true;
        localforage.setItem(CACHE_KEY, currentState);
    })
}
   

const HelpVideos = () => {

    const classes = useStyles();
    const [videoState,setVideoState] = useState({})

    const updateState = () =>{
        getVideoViews().then( vidState => {
            setVideoState(vidState);
        })
    }

    useEffect(()=>{
        updateState();
    },[])

    return (<div className={classes.videoContainer}>
        <VideoButton updateState={updateState} videoState={videoState} id={1} link="https://youtu.be/6zq6E_COEYo" icon={<Clipboard />} text="Instrucciones para hacer un reporte diaria" />
        <VideoButton updateState={updateState} videoState={videoState} id={2} link="https://youtu.be/3xDBB3MVmeU" icon={<ColorFill />} text="Instrucciones para hacer una prueba de las tiras reactiva" />
        <VideoButton  updateState={updateState} videoState={videoState} id={3} link="https://youtu.be/FGLdEW7cR0k" icon={<DeviceUnknown />} text="Otras Partes de la Aplicación" />
    </div>)

}

const VideoButton = (props) => {
    const classes = useStyles();

    const handleClick = () => {
        updateVideoState(props.id).then(props.updateState)
    }
    return(
        <NewButton href={props.link} positive={props.videoState[props.id]} className={classes.button} onClick={handleClick}  icon={props.icon} text={props.text} />
    )
}

export default HelpVideos;