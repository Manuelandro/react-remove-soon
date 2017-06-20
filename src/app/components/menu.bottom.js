import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'redux-little-router'
import {
    loggedAndHasQuoteSelector,
    cartCounterSelector,
    loggedSelector,
} from 'Selectors'
import { IconHome, IconAccount, IconCart } from 'Styled'
import { BottomMenu, FlexMenu, Voices, CartCounter } from '../styled'

const MenuBottom = ({ logged, counter }) => (
    <BottomMenu>
        <FlexMenu>
            <Voices>
                {logged
                    ? <Link href="/catalog">
                        <IconHome />
                    </Link>
                    : <IconHome />}
            </Voices>
            <Voices>
                {logged
                    ? <Link href="/customer">
                        <IconAccount />
                    </Link>
                    : <IconAccount />}
            </Voices>
            <Voices>
                {logged
                    ? <Link
                      href="/checkout"
                      style={{
                          position: 'relative',
                          display: 'block',
                          width: '100%',
                      }}
                    >
                        <CartCounter>{counter}</CartCounter>
                        <IconCart />
                    </Link>
                    : <IconCart />}
            </Voices>
        </FlexMenu>
    </BottomMenu>
)

MenuBottom.propTypes = {
    logged: PropTypes.bool.isRequired,
    counter: PropTypes.number,
}

MenuBottom.defaultProps = {
    logged: false,
    counter: 0,
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    logged: loggedSelector(state),
    counter: loggedAndHasQuoteSelector(state) ? cartCounterSelector(state) : 0,
})

export default connect(mapStateToProps, null, null, {
    renderCountProp: 'renderCountProp',
})(MenuBottom)
