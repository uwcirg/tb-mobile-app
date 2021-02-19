import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'

const useStyles = makeStyles({
  photoReportContainer:{
      "& > img":{
          margin: ".5em",
          width: "200px"
      }
  }
})

const ReviewPhotos = observer(() => {

    const classes = useStyles();
    const {practitionerStore} = useStores();

    return(<div className={classes.photoReportContainer}>
        {practitionerStore.filteredPatients.photo.map( photoItem => {
            return(<img src={photoItem.url}></img>)
        })}
    </div>)

})

export default ReviewPhotos;