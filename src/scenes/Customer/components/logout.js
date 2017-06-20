import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LogoutWrapper, ButtonLogout } from '../styled'
import * as actions from '../actions'

const Logout = ({ logoutStart }) => (
    <LogoutWrapper>
        <ButtonLogout onClick={() => logoutStart()}>Logout</ButtonLogout>
    </LogoutWrapper>
)

Logout.propTypes = {
    logoutStart: PropTypes.func.isRequired,
}

Logout.defaultProps = {
    logoutStart: () => {},
}

const mapDispatchToProps = {
    logoutStart: actions.logoutStart,
}

export default connect(null, mapDispatchToProps)(Logout)
