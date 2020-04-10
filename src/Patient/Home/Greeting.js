import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { DateTime } from 'luxon';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  container:{
      ...Styles.flexRow,
      justifyContent: "flex-start",
      alignItems: "center",
      width: "85%",
      marginBottom: "1em"
  },
  greeting:{
    fontWeight: "bold",
    fontSize: "1.25em"
  },
  date:{
    marginLeft: "auto",
    textTransform: "uppercase",
    color: Colors.textGray,
    fontSize: ".75em"
  }
})

const Greeting = () => {

  const { t, i18n } = useTranslation('translation');

  console.log(DateTime.local().toISOTime())

    const classes = useStyles();
    const {patientStore} = useStores();

    return(<div className={classes.container}>
        <div className={classes.greeting}>{t("greeting")} {patientStore.givenName} 👋 </div> 
        <div className={classes.date}>{DateTime.local().toLocaleString(DateTime.DATE_FULL)}</div>
    </div>)

}

export default Greeting;