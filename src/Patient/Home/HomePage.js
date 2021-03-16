import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Progress from './Progress';
import ActionBox from './ActionBox';
import Alerts from './Alerts';
import Colors from '../../Basics/Colors';
import Greeting from './Greeting'
import EducationalMessage from './Education'
import Reminders from './Reminders'
import MedicationReminder from './MedicationReminder'
import CachedReports from './CachedReports'
import VideoCard from './Videos'
import localforage from 'localforage'
import MissedReports from './MissedDays'

const HIDE_VIDEO_KEY = "isVideoCardHidden"

const HomePage = () => {

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

    return (
        <Body>
            <Greeting />
            <ActionBox />
            <MissedReports />
            {!hideVideo && <VideoCard hide={hideVideos} />}
            <CachedReports />
            <Progress />
            <MedicationReminder />
            <Reminders />
            <Alerts />
        </Body>
    )

};


const Body = styled.div`

padding-top: 1em;

width: 100%;
min-height: 90vh;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
background-color: ${Colors.backgroundGray}

`

export default HomePage;

