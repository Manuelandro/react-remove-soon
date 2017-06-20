/**
 * Validate the login form
 */
import isEmpty from 'lodash/isEmpty'
import { domains } from 'Config'

export const validateLogin = (data) => {
    const valid = {
        passed: true,
        'login[username]': { passed: true, error: '' },
        'login[password]': { passed: true, error: '' },
    }

    const email = data['login[username]']
    const pass = data['login[password]']

    const validDomain = new RegExp(`([a-zA-Z0-9._%+-])+(${domains.join('|')})$`)

    if (!validDomain.test(email)) {
        valid.passed = false
        valid['login[username]'].passed = false
        valid['login[username]'].error = 'Inserisci una mail corretta'
    }

    if (isEmpty(email)) {
        valid.passed = false
        valid['login[username]'].passed = false
        valid['login[username]'].error = 'Questo campo è obbligatorio'
    }

    if (isEmpty(pass)) {
        valid.passed = false
        valid['login[password]'].passed = false
        valid['login[password]'].error = 'Questo campo è obbligatorio'
    }

    return valid
}
