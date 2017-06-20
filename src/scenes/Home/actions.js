import * as c from 'Consts'

// actions' shortners
const f = type => (payload = {}) => dispatch => dispatch({ type, payload })

// creators for components
export const inputChange = f(c.INPUT_CHANGE)
export const loginStart = f(c.LOGIN_START)
export const registerStart = f(c.REGISTER_START)
export const forgotPasswordStart = f(c.FORGOT_PASSWORD_START)
export const forgotPassword = f(c.FORGOT_PASSWORD)