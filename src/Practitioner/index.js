import React from 'react';
import { useTranslation } from 'react-i18next';
import {observer} from 'mobx-react'
import useStores from '../Basics/UseStores';
import {makeStyles} from '@material-ui/core/styles';
import PractitionerBody from './PractitionerBody';
import Drawer from './Drawer'
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

    const {practitionerStore,uiStore} = useStores();
    const {t, i18n} = useTranslation('translation');

    return(
        <div className={classes.container}>
            {isMobile? <MobileNav /> : <Drawer />}
            <PractitionerBody />
        </div>
    )
 
});

export default PractitionerHome;
