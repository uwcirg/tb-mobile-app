import React from 'react'
import {
    connect
} from 'react-redux'

import NavBar from '../../components/BottomNavBar';

import {
    toggleNav
} from '../../actions'

const mapStateToProps = state => ({ collapsed: state.nav.collapsed,});

const mapDispatchToProps = (dispatch) => {
    return {
        onToggle: () => dispatch(toggleNav())
    }
}

const CollapseNav = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavBar);

export default CollapseNav;