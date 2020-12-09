import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import {observer} from 'mobx-react'
import SectionHeader from './SectionHeader'

const useStyles = makeStyles({
  container:{
      
  },
  photoCardsContainer:{
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  photo:{
    height: "250px",
    marginRight: "1em",
    marginBottom: "1em"
  }
})

const PhotoSummary = observer(() => {

    const classes = useStyles();
    const {adminStore} = useStores();

    return(<div className={classes.container}>
        <SectionHeader>Test Strip Submissions</SectionHeader>
        {adminStore.recentPhotos.loading ? <p> Loading</p> : <Photos list={adminStore.recentPhotos.data} />}

    </div>)

});

const Photos = ({list}) => {
    const classes = useStyles();
    return(
        <div className={classes.photoCardsContainer}>
        {list.map( item => {
              return <img className={classes.photo} src={item.url} />
        })}
      
        </div>
    )
}

export default PhotoSummary;