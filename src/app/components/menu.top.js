import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'redux-little-router'
import { skinUrl } from 'Config'
import {
    loggedAndHasQuoteSelector,
    cartCounterSelector,
    loggedSelector,
    currentRouteSelector,
} from 'Selectors'
import {
    TopMenu,
    TopMenuMaxWrapper,
    Logo,
    TopIconsWrapper,
    IconHome,
    IconAccount,
    IconCart,
} from 'Styled'
import { CartCounter } from '../styled'

const MenuTop = ({ route, logged, counter }) => (
    <TopMenu>
        <TopMenuMaxWrapper>
            {logged
                ? <TopIconsWrapper>
                    <Link
                      href="/catalog"
                      style={{
                          flex: 1,
                      }}
                    >
                        <IconHome active={route === '/catalog'} />
                    </Link>
                    <Link
                      href="/customer"
                      style={{
                          flex: 1,
                      }}
                    >
                        <IconAccount active={route === '/customer'} />
                    </Link>
                    <Link
                      href="/checkout"
                      style={{
                          flex: 1,
                          position: 'relative',
                          display: 'block',
                          width: '100%',
                      }}
                    >
                        <IconCart active={route === '/checkout'} />
                        <CartCounter>{counter}</CartCounter>
                    </Link>
                </TopIconsWrapper>
                : null}
            <Logo src={`${skinUrl}/images/logo.svg`} alt="" />
        </TopMenuMaxWrapper>
    </TopMenu>
)

MenuTop.propTypes = {
    route: PropTypes.string.isRequired,
    logged: PropTypes.bool.isRequired,
    counter: PropTypes.number,
}

MenuTop.defaultProps = {
    route: '',
    logged: false,
    counter: 0,
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    route: currentRouteSelector(state),
    logged: loggedSelector(state),
    counter: loggedAndHasQuoteSelector(state) ? cartCounterSelector(state) : 0,
})

export default connect(mapStateToProps, null, null, {
    renderCountProp: 'renderCountProp',
})(MenuTop)
