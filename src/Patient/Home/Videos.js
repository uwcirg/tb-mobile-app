import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InteractionCard from '../../Basics/InteractionCard';
import { ReactComponent as VideoIcon } from '../../Basics/Icons/videos.svg';
import SmallVideoIcon from '@material-ui/icons/OndemandVideo';
import Videos from '../Information/HelpVideos'
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import ExpansionPanel from '../../Basics/ExpansionPanel';
import localforage from 'localforage'


const useStyles = makeStyles({
    container: {
        display: "flex",
        width: "90%",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: "1em",
        "& > svg": {
            flex: 1,
            height: "80px",
            width: "50%"
        },
        "& > div": {
            flex: 1.5,
            padding: "0 .5em 0 .5em",
            display: "flex",
        }
    },
    title: {
        padding: 0,
        margin: 0,
        fontSize: "1.1em",
        textAlign: "left",
    }
})

const HIDE_VIDEO_KEY = "isVideoCardHidden"

const VideoCard = (props) => {

    const classes = useStyles();
    const [showLinks, setShowLinks] = useState(false);
    const { t } = useTranslation('translation');
    const toggleShow = () => {setShowLinks(!showLinks)}

    const [hideVideo,setHideVideo] = useState(true);

    const checkVideosHiden = () => {
        localforage.getItem(HIDE_VIDEO_KEY).then(value => {
            setHideVideo(value === true)    
        })
    }

    const hideVideos = () => {
        localforage.setItem(HIDE_VIDEO_KEY,true).then(value =>{
            setHideVideo(true);
        })
    }
    
    useEffect(()=>{
        checkVideosHiden();
    },[])

    if(hideVideo) return <> </>
    
    return (

        <InteractionCard bottomButton hide={hideVideos} upperText={<><SmallVideoIcon /> {t('patient.information.helpVideos')}</>}>
            
            <div className={classes.container}>
                <div>
                <Typography variant="h2" className={classes.title}>{t('patient.home.helpVideos.needHelp')}</Typography>
                </div>
                <VideoIcon />
            </div>
             <ExpansionPanel
                toggleFunction={toggleShow}
                previewClassName={classes.reportPreview}
                preview={showLinks ? t('patient.home.helpVideos.hide') : t('patient.home.helpVideos.seeAll')}

            >
                <Videos />
            </ExpansionPanel>

        </InteractionCard>
    );

}

export default VideoCard;