// This file had to be rushed due to a deadline, could use a cleanup to make components more clear
// should refactor out reusable part, and seperate the actual error boundry
// also "NonFixedButtons" needs to be renamed 

import React from 'react'
import useLogout from './Logout'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Colors from './Colors';
import { ReactComponent as ErrorIcon } from './Icons/Error.svg';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  background: {
    minHeight: "100vh",
    width: "100%",
    height: "100%"
  },
  container: {
    marginBottom: "100px",
    width: "95%",
    margin: "auto",
    paddingTop: "1em",
    "& > * > h1": {
      fontSize: "1.25em",
      marginLeft: "1em",
      textAlign: "center"

    },
    "& > * > h2, & > h2": {
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

    },
    " & > .info-container": {
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      backgroundColor: Colors.lightgray,
      color: 'black',
      padding: ".75em",
      borderRadius: "5px",
      "& > .centered": {
        textAlign: "center",
        marginBottom: "1em"
      },

      "& > ul": {
        padding: "1em"
      },
      "& > .contact-list": {
        "& > li": {
          "& > a, & > a:visited": {
            color: Colors.buttonBlue
          },
          listStyle: "none",
          marginBottom: ".5em"
        }
      }
    }
  },
  buttonsContainer: {
    boxSizing: "border-box",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    bottom: 0,
    right: 0,
    width: "100%",
  },
  buttons: {
    alignSelf: "center",
    "& > button > span": {
      lineHeight: "1.25em"
    },
    "& > button": {
      backgroundColor: "white",
      color: Colors.buttonBlue
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

        <Header />
        <Resolve />
        <Contact />
        <Buttons />
      </Container >);
    }

    return this.props.children;
  }
}

const Header = () => {
  const { t } = useTranslation('translation');
  return (
    <div className="header">
      <ErrorIcon />
      <Typography variant="h1">{t('errors.page.header')}
        <br />
        {t('errors.page.sorry')} 😕</Typography>
      <Typography variant="h1"></Typography>
    </div>
  )
}

const Resolve = () => {
  const { t } = useTranslation('translation');
  return (
    <>
      <h2 className="centered" variant="h2">{t('errors.page.try')}:</h2>
      <div className="info-container">
        <ul>
          <li>{t('errors.page.reloadStep')}</li>
          <li>{t('errors.page.loginStep')}</li>
          <li>{t('errors.page.closeStep')}</li>
        </ul>
      </div>
    </>
  )
}

const Contact = () => {

  const { t } = useTranslation('translation');
  return (
    <>
      <h2>{t('errors.page.furtherSupport')}:</h2>
      <div className="info-container">
        <p>{t('errors.page.contactDetails')}</p>
        <ul className="contact-list">
          <li>WhatsApp <br /> <a href="https://wa.me/18014194928">+1(801)419-4928</a></li>
          <li>{t('login.email')} <br /> <a href="mailto:sjiribar@uw.edu?subject=%5BTB%20Application%20Issues%5D">sjiribar@uw.edu</a></li>
        </ul>
      </div>
    </>
  )
}


const Buttons = () => {
  const classes = useStyles();
  return (
    <div className={classes.buttonsContainer}>
      <NonFixedButtons />
    </div>
  )
}

const NonFixedButtons = () => {
  const { t } = useTranslation('translation');
  const classes = useStyles();

  const logout = useLogout();
  return (<ButtonGroup className={classes.buttons} fullWidth>
    <Button onClick={logout}>{t('patient.profile.logout')}</Button>
    <Button onClick={() => { location.reload(); }}>{t('errors.reload')}</Button>
  </ButtonGroup>)
}

const Container = (props) => {

  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        {props.children}
      </div>
    </div>
  )

}

const StaticVersion = () => {
  return (
    <Container>
      <Resolve />
      <br />
      <NonFixedButtons />
      <br />
      <Contact />
    </Container>
  )
}

export {StaticVersion}