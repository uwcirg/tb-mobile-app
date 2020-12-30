import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import {observer} from 'mobx-react'
import SectionHeader from './SectionHeader'
import SummaryCard from './SummaryCard'

const useStyles = makeStyles({
  siteOverviewContainer:{
      margin: "1em 0 1em 0"
  },
  cardContainer:{
      display: "flex"
  }
})

const SiteSummary = () => {

    const classes = useStyles();

    return(<div className={classes.siteOverviewContainer}>
        <SectionHeader>Sites Overview</SectionHeader>
        <div className={classes.cardContainer}>
        <SummaryCard number={2} title="Active Sites" />
        </div>
    </div>)

}

export default SiteSummary;