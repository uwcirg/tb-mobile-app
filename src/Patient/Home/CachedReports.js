import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'

const useStyles = makeStyles({
  
})

const CachedReports = observer(() => {
    const classes = useStyles();
    const {patientStore} = useStores();

    useEffect(()=>{
        patientStore.checkNumberOfOfflineReports();
    })

    return(<div>
    <p>{patientStore.numberOfflineReports} need to be uploaded</p>
    </div>)

})

export default CachedReports;