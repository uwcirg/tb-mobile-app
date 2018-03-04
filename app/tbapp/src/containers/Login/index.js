import React from 'react'
import {
  connect
} from 'react-redux'
import {
  login
} from '../../actions'

import Startup from '../../components/Startup'

// Google:
// const config = {
//   url: "https://accounts.google.com/o/oauth2/v2/auth",
//   client: "527030791301-ndth0ds5anfck5nk1l40u4su2qqiq1v8.apps.googleusercontent.com",
//   redirect: "http://lvh.me:3060/redirect",
//   scope: "https://www.googleapis.com/auth/calendar.readonly",
//   prompt: 'consent',
// }

// Authlib:
const config = {
  // url: "https://play.authlib.org/oauth2/authorize",
  url: "http://lvh.me:8080/oauth2/authorize",
  client: "skwIPnbi7N3uIvNysUbi0xfXwnWaIMR1MCJxz8rV0dGxeMJD",
//  redirect: "https://tb-mobile.cirg.washington.edu/redirect",
  redirect: "http://lvh.me:3060/redirect",

  scope: "email",
} 

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
})

const mapDispatchToProps = (dispatch) => {
  return {
      login: () => dispatch(login(config))
  }
}
const Login = connect(mapStateToProps, mapDispatchToProps)(Startup);

export default Login;