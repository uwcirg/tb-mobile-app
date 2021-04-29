import React from 'react';
import {observer} from 'mobx-react'
import {makeStyles} from '@material-ui/core/styles';
import PractitionerBody from './PractitionerBody';
import Drawer from './Navigation'
import MobileNav from './MobileNav'
import useResize from '../Hooks/Resize'

const useStyles = makeStyles({
    container:{
        width: "100%",
        display: "flex"
    }
})

const PractitionerHome = observer(() => {

    const classes = useStyles();
    const {isMobile} = useResize();

    return(
        <div className={classes.container}>
            {isMobile? <MobileNav /> : <Drawer />}
            <PractitionerBody />
        </div>
    )
 
});

export default PractitionerHome;
