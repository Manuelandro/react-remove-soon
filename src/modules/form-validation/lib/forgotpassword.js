/**
 * Validate the login form
 */
import isEmpty from 'lodash/isEmpty'
import { domains } from 'Config'

export const validateForgotPassword = (data) => {
    const valid = {
        passed: true,
        'email': { passed: true, error: '' },
    }
    
    const email = data['email']
    
    const validDomain = new RegExp(`([a-zA-Z0-9._%+-])+(${domains.join('|')})$`)
    
    if (!validDomain.test(email)) {
        valid.passed = false
        valid['email'].passed = false
        valid['email'].error = 'Inserisci una mail corretta'
    }
    
    if (isEmpty(email)) {
        valid.passed = false
        valid['email'].passed = false
        valid['email'].error = 'Questo campo è obbligatorio'
    }
    
    return valid
}
