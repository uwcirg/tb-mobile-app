import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import InteractionCard from '../../Basics/InteractionCard';
import { ReactComponent as VideoIcon } from '../../Basics/Icons/videos.svg';
import SmallVideoIcon from '@material-ui/icons/OndemandVideo';
import Videos from '../Information/HelpVideos'
import Grow from '@material-ui/core/Collapse'
import ClickableText from '../../Basics/ClickableText'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'

const useStyles = makeStyles({
    container: {
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        "& > svg": {
            flex: 1,
            height: "80px",
            width: "50%"
        },
        "& > div": {
            flex: 2,
            padding: "0 1em 0 1em",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        }
    },
    showButton:{
        marginTop: ".25em",
        flexDirection: "row-reverse"
     
    },
    videos:{
        marginTop: ".5em"
    }
})

const VideoCard = () => {

    const classes = useStyles();
    const [showLinks, setShowLinks] = useState(false);

    return (

        <InteractionCard upperText={<><SmallVideoIcon /> Instructional Videos</>}>
            <div className={classes.container}>
                <div>
                    Need help using the app?
    <ClickableText className={classes.showButton} hideIcon text={<>{ showLinks ? <UpIcon /> : <DownIcon />} {showLinks ? "Hide" : "See Video Tutorials"}</>} onClick={() => { setShowLinks(!showLinks) }} />
                </div>
                <VideoIcon />
            </div>

            <Grow className={classes.videos} in={showLinks}>
                <Videos />
            </Grow>

        </InteractionCard>
    );

}

export default VideoCard;