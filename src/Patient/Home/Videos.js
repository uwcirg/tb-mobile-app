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
import { useTranslation } from 'react-i18next';


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

const VideoCard = (props) => {

    const classes = useStyles();
    const [showLinks, setShowLinks] = useState(false);
    const { t, i18n } = useTranslation('translation');

    return (

        <InteractionCard bottomButton hide={props.hide} upperText={<><SmallVideoIcon /> {t('patient.information.helpVideos')}</>}>
            <div className={classes.container}>
                <div>
                    {t('patient.home.helpVideos.needHelp')}
    <ClickableText className={classes.showButton} hideIcon text={<>{ showLinks ? <UpIcon /> : <DownIcon />} {showLinks ? t('patient.home.helpVideos.hide'): t('patient.home.helpVideos.seeAll')}</>} onClick={() => { setShowLinks(!showLinks) }} />
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