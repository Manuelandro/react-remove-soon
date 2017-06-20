import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withState, withHandlers } from 'recompose'
import { makeGetCartSelector } from 'Selectors'
import { validateEnter } from 'Modules/form-validation'
import * as actions from '../actions'
import { CouponWrapper, InputTextCoupon, ButtonCoupon } from '../styled'

const hoc = compose(
    withState('value', 'change', ''),
    withHandlers({
        onChange: ({ change }) => e => change(e.target.value),
    }),
)

const Coupon = hoc(({ couponToggle, onChange, value, couponApplied }) => (
    <CouponWrapper>
        {couponApplied.length === 0
            ? <InputTextCoupon
              type="text"
              value={value}
              onChange={onChange}
              onKeyPress={e => validateEnter(e, () => couponToggle(value))}
            />
            : <InputTextCoupon
              type="text"
              value={couponApplied}
              disabled="disabled"
            />}
        <ButtonCoupon onClick={() => couponToggle(value)}>
            {couponApplied.length === 0
                ? <span>Applica</span>
                : <span>Rimuovi</span>}
        </ButtonCoupon>
    </CouponWrapper>
))

Coupon.defaultProps = {
    couponApplied: '',
    couponToggle: () => {},
}

Coupon.propTypes = {
    couponApplied: PropTypes.string.isRequired,
    couponToggle: PropTypes.func.isRequired,
}

// reselect - sharing-selectors-with-props-across-multiple-components
const makeMapStateToProps = () => {
    const getCartSelector = makeGetCartSelector()
    const mapStateToProps = state => ({
        couponApplied: getCartSelector(state).coupon,
    })

    return mapStateToProps
}

const mapDispatchToProps = {
    couponToggle: actions.couponToggle,
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Coupon)
