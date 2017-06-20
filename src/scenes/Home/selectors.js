import { createSelector } from 'reselect'

// plain selectors
export const getLoginForm = ({ home }) => ({
    'login[username]': home.login['login[username]'],
    'login[password]': home.login['login[password]'],
    form_key: home['form_key'],
})

export const getRegisterForm = ({ home }) => ({
    firstname: home.register['firstname'],
    lastname: home.register['lastname'],
    customer_telephone: home.register['customer_telephone'],
    email: home.register['email'],
    password: home.register['password'],
    privacy: home.register['privacy'],
    form_key: home['form_key'],
})

export const getForgotPasswordForm = ({ home }) => ({
    email: home.forgotpassword['email'],
    form_key: home['form_key'],
})
