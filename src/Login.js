import { connect } from 'react-redux'
import { login } from './actions'

import Startup from './components/Startup'

const config = {
  url: process.env.REACT_APP_API_PATH + "/oauth2/authorize",
  client: process.env.REACT_APP_CLIENT_ID,
  redirect: process.env.REACT_APP_REDIRECT_PATH,
  scope: "email",
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
})

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login(config))
})

export default connect(mapStateToProps, mapDispatchToProps)(Startup)
