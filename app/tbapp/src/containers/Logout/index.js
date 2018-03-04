import React from 'react'
import {
    connect
} from 'react-redux'
import { logout } from '../../actions'
import { Button } from 'react-bootstrap'
import Startup from '../../components/Startup'

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

const mapStateToProps = ({ auth }) => ({
    isLoggedIn: auth.isLoggedIn
})

const Logout = ({logout}) =>
    <div className='row'>
        <div className='startup'>
            <div className='v-center'>
                <Button onClick={logout} bsSize='lg' block bsStyle='danger'>Logout</Button>
            </div>
        </div>
    </div>

export default connect(mapStateToProps, mapDispatchToProps)(Logout);;