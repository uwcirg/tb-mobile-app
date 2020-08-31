import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import {observer} from 'mobx-react'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  
})

const AddOrganization = () => {

    const classes = useStyles();

    return(<div>
        <h2> Add Organization</h2>
        <form>
            <TextField label="Title"></TextField>


        </form>

    </div>)

}

export default AddOrganization;