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

    const sha = process.env.REACT_APP_BUILD_NUMBER
    const test = process.env.REACT_APP_NOT_SET

    useEffect(() => {
        if (true) {
            //fetch(`https://api.github.com/repos/uwcirg/tb-mobile-app/commits/${sha}`)
            fetch(`https://api.github.com/repos/uwcirg/tb-mobile-app/commits/7f046da22527dd28171bb7b00c1c3ccbd616acf1`)
                .then(res => res.json())
                .then(json => {
                    try{
                    const dt =  DateTime.fromISO(json.commit.author.date)
                    const version = `${window._env.DOCKER_TAG}:${dt.year}.${dt.month}.${dt.day}.${dt.hour}`
                     setVersion(version);
                    }
                    catch(err){
                        console.log("Error With Version Number")
                    }
                })
        }

    }, [])

    return (<p>
        {version}
        Commit time:{process.env.REACT_APP_GITHUB_VERSION}
    </p>)

}

export default VersionNumber;