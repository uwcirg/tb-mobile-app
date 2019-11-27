import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { inject, observer } from 'mobx-react';

const Login = inject("participantStore")(observer(({ participantStore, props }) => {
  //export default function UploadedCard() {
  const classes = useStyles({
    margin: {
      marginTop: '2em'
    }
  });

  let updatePassword = (e) => {
    participantStore.loginPassword = e.target.value;
  }

  let updatePhone = (e) => {
    participantStore.loginPhoneNumber = e.target.value
  }

  let handleLogin = () => {
    participantStore.login();
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">Phone Number</InputLabel>
          <Input
            onChange={(e) => { updatePhone(e) }}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
          <Input
            onChange={(e) => { updatePassword(e) }}
            type="password"
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <Button onClick={handleLogin} variant="contained" color={"primary"} className={classes.margin}> Login</Button>
      </div>
    </div>

  );
}));

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: "2em",
  },
  card: {
    margin: "auto",
    width: "40%",
    alignSelf: "center",

  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "90vh",
    width: "100%"
  }
}));

export default Login;