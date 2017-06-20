import * as c from 'Consts'

// actions' shortners
const f = type => (payload = {}) => dispatch => dispatch({ type, payload })

// creators for components
export const addToCart = f(c.CART_ADD_START)
export const updateQty = f(c.CART_UPDATE_START)
export const toggleFilter = f(c.TOGGLE_FILTER)
