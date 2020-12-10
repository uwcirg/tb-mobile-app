import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react'
import Loading from '../Practitioner/Shared/Loading'
import SummaryCard from './SummaryCard'
import Colors from '../Basics/Colors'
import SectionHeader from './SectionHeader'

const useStyles = makeStyles({
    summary: {
        "& > div": {
            marginTop: "1em"
        }
    },
    cardsContainer:{
        display: "flex",
        width: "100%",
        flexWrap: "wrap"
    }
})

const TrialSummary = observer(() => {

    const classes = useStyles();
    const { adminStore } = useStores();

    return (<div className={classes.summary}>
        {adminStore.summary.loading ? <Loading /> : <Cards data={adminStore.summary.data.patients} />}
        <div> </div>
    </div>)

})

const Cards = ({data}) => {

    const classes = useStyles();
    
    return (<div className={classes.cardsContainer}>
        <SectionHeader>Patients</SectionHeader>
        <SummaryCard title="Active" number={data.active}  />
        <SummaryCard title="High Priority" number={data.priorities.high} color={Colors.warningRed} />
        <SummaryCard title="Low Priority" number={data.priorities.low || 0} color={Colors.green} />
    </div>)

}

export default TrialSummary;