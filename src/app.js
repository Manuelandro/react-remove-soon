import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { loadedSelector, requestLoaderSelector } from 'Selectors'
import { mediaQry } from 'Config'
import { Footer } from 'Styled'
import AppLoader from './app/components/app.loader'
import MenuTop from './app/components/menu.top'
import MenuBottom from './app/components/menu.bottom'
import RequstLoader from './app/components/request.loader'

const App = ({ loaded, showRequestLoader, children }) => {
    if (!loaded) return <AppLoader />

    return (
        <div>
            {showRequestLoader ? <RequstLoader /> : null}
            <MediaQuery minDeviceWidth={mediaQry}>
                <MenuTop />
            </MediaQuery>
            {children}
            <Footer />
            <MediaQuery maxDeviceWidth={mediaQry - 1}>
                <MenuBottom />
            </MediaQuery>
        </div>
    )
}

App.defaultProps = {
    loaded: false,
    showRequestLoader: false,
    children: {},
}

App.propTypes = {
    loaded: PropTypes.bool.isRequired,
    showRequestLoader: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired // eslint-disable-line
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    loaded: loadedSelector(state),
    showRequestLoader: requestLoaderSelector(state),
})

export default connect(mapStateToProps, null, null, {
    renderCountProp: 'renderCountProp',
})(App)
