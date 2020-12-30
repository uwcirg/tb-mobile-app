import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react'
import SectionHeader from './SectionHeader'
import SummaryCard from './SummaryCard'
import { DateTime } from 'luxon'
import Colors from '../Basics/Colors';

const useStyles = makeStyles({
    photoCardsContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginTop: "1em"
    },
    photo: {
        width: "250px",
        display: "flex",
        "& > img": {
            height: "80%",
            width: "100%",
            objectFit: "cover"
        },
        "& > span": {
            textTransform: "capitalize",
            marginTop:"5px"
        },
        flexDirection: "column",
        alignItems: "flex-start",
        marginRight: "1em",
        marginBottom: "2em"
    },
    cardContainer: {
        display: "flex"
    },
    tag: {
        backgroundColor: props => props.approved !== null ? props.approved ? Colors.approvedGreen : Colors.yellow : Colors.gray,
        padding: "5px"
    }
})

const PhotoSummary = observer(() => {

    const classes = useStyles();
    const { adminStore } = useStores();

    return (<div className={classes.container}>
        <SectionHeader>Test Strip Submissions</SectionHeader>
        <div className={classes.cardContainer}>
            {!adminStore.summary.loading && <SummaryCard number={`${adminStore.summary.data.photos.numberOfSubmissions}/${adminStore.summary.data.photos.numberRequested}`} title="Submitted / Requested Total" />}
            <SummaryCard number={'4/5'} title="Submitted / Requested Today" />
        </div>

        {adminStore.recentPhotos.loading && adminStore.recentPhotos.data ? <p> Loading</p> : <Photos list={adminStore.recentPhotos.data} />}

    </div>)

});

const Tag = (props) => {
    const classes = useStyles({ approved: props.approved });

    return (
        <span className={classes.tag}>{props.approved !== null ? props.approved ? "Conclusive" : "Inconclusive" : "Pending"}</span>
    )
}

const Photos = ({ list }) => {
    const classes = useStyles();
    return (
        <div className={classes.photoCardsContainer}>
            {list.map(item => {
                const date = DateTime.fromISO(item.createdAt);
                return (
                    <div className={classes.photo}>
                        <img src={item.url} />
                        <span>{date.toRelativeCalendar()}</span>
                        <span>{date.toLocaleString(DateTime.DATETIME_MED)}</span>
                        <Tag approved={item.approved} />
                    </div>
                )
            })}

        </div>
    )
}

export default PhotoSummary;