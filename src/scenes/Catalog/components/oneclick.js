import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { oneclickSelector } from 'Selectors'

const Oneclick = ({ active }) => (!active ? null : <div>Sono oneclick</div>)

Oneclick.propTypes = {
    active: PropTypes.bool.isRequired,
}

Oneclick.defaultProps = {
    active: false,
}

const mapStateToProps = state => ({
    active: oneclickSelector(state),
})

export default connect(mapStateToProps)(Oneclick)
