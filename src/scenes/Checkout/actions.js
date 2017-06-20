import * as c from 'Consts'

// actions' shortners
const f = type => (payload = {}) => dispatch => dispatch({ type, payload })

// creators for components
export const couponToggle = f(c.COUPON_TOGGLE)
export const placeOrder = f(c.CHECKOUT_START)
