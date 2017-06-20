import * as c from 'Consts'

// actions' shortners
const f = type => (payload = {}) => dispatch => dispatch({ type, payload })

// creators for components
export const savePassword = f(c.EDIT_PASSWORD_START)
export const logoutStart = f(c.LOGOUT_START)

export const saveCreditCard = f(c.SAVE_CREDIT_CARD)
export const saveDomecCard = f(c.SAVE_DOMEC_CARD)
export const savePaypalAccount = f(c.SAVE_PAYPAL_ACCOUNT)
