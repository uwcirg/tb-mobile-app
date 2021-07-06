import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { DateTime } from 'luxon';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import {observer} from 'mobx-react'

const useStyles = makeStyles({
  container:{
      ...Styles.flexRow,
      justifyContent: "flex-start",
      alignItems: "center",
      width: "85%",
      margin: "1em 0"
  },
  greeting:{
    fontWeight: "medium",
    fontSize: "1.25em"
  },
  date:{
    marginLeft: "auto",
    textTransform: "uppercase",
    color: Colors.textGray,
    fontSize: ".75em"
  }
})

const Greeting = observer(() => {

  const { t } = useTranslation('translation');

    const classes = useStyles();
    const {patientStore} = useStores();

    return(<div id="intro-greeting" className={classes.container}>
        <div className={classes.greeting}>{t("greeting")} {patientStore.givenName} 👋 </div> 
        <div className={classes.date}>{DateTime.fromISO(patientStore.reportStore.todaysDate).toLocaleString(DateTime.DATE_FULL)}</div>
    </div>)

})

export default Greeting;