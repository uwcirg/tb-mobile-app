import React from "react"
import { connect } from "react-redux"
import { Button } from "reakit"

import { logout } from "./actions"

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
})

const Logout = ({logout}) => (
  <Button onClick={logout}>Logout</Button>
)

export default connect(mapStateToProps, mapDispatchToProps)(Logout);;
