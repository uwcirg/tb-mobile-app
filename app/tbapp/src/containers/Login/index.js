import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login, logout } from '../../redux-implicit-oauth2'
import { Button } from 'react-bootstrap';

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
  url: "https://play.authlib.org/oauth2/authorize",
  client: "527030791301-ndth0ds5anfck5nk1l40u4su2qqiq1v8.apps.googleusercontent.com",
  redirect: "https://tb-mobile.cirg.washington.edu/redirect",
  scope: "email",
}

const Login = ({ isLoggedIn, login, logout }) => {
  if (isLoggedIn) {
    return <Button className='nav-link' onClick={logout}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</Button>
  } else {
    return <Button className='nav-link' onClick={login}><i className="fa fa-sign-in" aria-hidden="true"></i>Login</Button>
  }
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
})

const mapDispatchToProps = {
  login: () => login(config),
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)