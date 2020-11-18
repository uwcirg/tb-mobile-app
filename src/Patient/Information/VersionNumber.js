import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import {DateTime} from 'luxon'

const useStyles = makeStyles({

})

const VersionNumber = () => {

    const classes = useStyles();
    const [version, setVersion] = useState("")

    return (<p>
        Version {process.env.REACT_APP_GITHUB_VERSION}
    </p>)

}

export default VersionNumber;