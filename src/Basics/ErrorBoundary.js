import React from 'react'
import useLogout from './Logout'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Colors from './Colors';
import { ReactComponent as DoctorIcon } from './Icons/DoctorGroup.svg';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  container: {
    width: "95%",
    margin: "auto",
    paddingTop: "1em",
    "& > * > h1": {
      fontSize: "1.25em",
      marginLeft: "1em",
      textAlign: "center"

    },
    "& > h2": {
      fontSize: "1em"
    },
    "& > .header": {
      borderRadius: "5px",
      padding: "1em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > svg": {
        height: "150px"
      }

    },
    "& > ol": {

    }
  },
  buttons:{
    "& > button > span":{
      lineHeight: "1.25em"
    }
    
  }


})

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("error here")

  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<Container>
        <div className="header">
          <DoctorIcon />
          <h1>Something went wrong with the application 😕</h1>
        </div>
        <h2>Sorry about that. </h2>
        <h2>Please try these steps to see if they resolve the issue (using the buttons below)</h2>
        <ul>
          <li>Refresh the page</li>
          <li>Log Out and Log Back In</li>
          <li>Close app from at a system level or close browser tab</li>
        </ul>

        <h2>Click Here To:</h2>
        <Buttons />

      <Contact />
      </Container >);
    }

    return this.props.children;
  }
}

const Contact = () => {

  const { t} = useTranslation('translation');
  return(
    <>
  <h2>For Further Support Contact Us:</h2>
  <ul>
    <li>WhatsApp: <a href="https://wa.me/18014194928">+1(801)419-4928</a></li>
    <li>{t('login.email')}: <a href="mailto:sjiribar@uw.edu?subject=%5BTB%20Application%20Issues%5D">sjiribar@uw.edu</a></li>
  </ul>
  </>
  )
}


const Buttons = () => {
  const { t } = useTranslation('translation');
  const classes = useStyles();
  return (
    <ButtonGroup className={classes.buttons} fullWidth>
      <Button onClick={() => { setOpen(true) }}>{t('patient.profile.logout')}</Button>
      <Button onClick={() => { patientStore.updateNotificationTime(true) }}>{t('errors.reload')}</Button>
    </ButtonGroup>
  )
}

const LogOutButton = () => {
  const logout = useLogout();

  const handleClick = () => {
    logout();
    location.reload();
  }
  return (
    <Button onClick={handleClick}> Log Out</Button>
  )
}

const Container = (props) => {

  const classes = useStyles();

  return (<div className={classes.container}>
    {props.children}
  </div>)

}