import IconButton from '@material-ui/core/IconButton'
import CheckIcon from '@material-ui/icons/CheckCircle'
import XIcon from '@material-ui/icons/HighlightOff'

import React, { useEffect } from 'react';
import { observer } from 'mobx-react'
import useStores from '../Basics/UseStores';
import makeStyles from '@material-ui/core/styles/makeStyles'



const useStyles = makeStyles({
    stripPhoto: {
        width: "200px"
    }
})


const PhotoList = observer((props) => {

    const { practitionerStore } = useStores();
    const classes = useStyles();

    useEffect(() => {
        practitionerStore.getPhotoReports();
    }, []);


    let list = "";
    if(practitionerStore.photoReports.length > 0){
    list = practitionerStore.photoReports.map(report => {
        return <div>
            <img className={classes.stripPhoto} src={report.url} />
            <div>
            {report.photo_id}
            </div>
            <IconButton onClick={() => {practitionerStore.approvePhoto(report.photo_id)}}><CheckIcon /> </IconButton>
            <IconButton> <XIcon /></IconButton>
            
        </div>
    })}else{
        list = <h1>No Reports left!</h1>
    }

    return (
        <>
        <button onClick={practitionerStore.getPhotoReports}>Update</button>
        <div>
            {list}
        </div>
        </>
    )

});

const ProcessedPhotoList = observer((props) => {

    const { practitionerStore } = useStores();
    const classes = useStyles();

    useEffect(() => {
        practitionerStore.getProcessedPhotoReports();
    }, []);


    let list = "";
    if(practitionerStore.processedPhotoReports.length > 0)list = practitionerStore.processedPhotoReports.map(report => {
        return <div>
            <img className={classes.stripPhoto} src={report.url} />
            <div>
            {report.photo_id}
            </div>
            {report.approved ? <p>approved!</p> : <p> Not approved</p> }
            
        </div>
    })

    return (
        <>
        <button onClick={practitionerStore.getProcessedPhotoReports}>Update</button>
        <div>
            {list}
        </div>
        </>
    )

});


export default function PhotoView(props){
    if(props.processed) return <ProcessedPhotoList />
    return <PhotoList />
}
