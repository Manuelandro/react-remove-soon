import isEmpty from 'lodash/isEmpty'
import { domains } from 'Config'

export const validateRegister = (data) => {
    const valid = {
        passed: true,
        firstname: { passed: true, error: '' },
        lastname: { passed: true, error: '' },
        customer_telephone: { passed: true, error: '' },
        email: { passed: true, error: '' },
        password: { passed: true, error: '' },
        privacy: { passed: true, error: '' },
    }

    const {
        firstname,
        lastname,
        customer_telephone,
        email,
        password,
        privacy,
    } = data

    const validDomain = new RegExp(`([a-zA-Z0-9._%+-])+(${domains.join('|')})$`)
    const regexPhone = /^\d*$/
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/

    if (!validDomain.test(email)) {
        valid.passed = false
        valid.email.passed = false
        valid.email.error = 'Inserisci una mail corretta'
    }

    if (isEmpty(firstname)) {
        valid.passed = false
        valid.firstname.passed = false
        valid.firstname.error = 'Questo campo è obbligatorio'
    }

    if (isEmpty(lastname)) {
        valid.passed = false
        valid.lastname.passed = false
        valid.lastname.error = 'Questo campo è obbligatorio'
    }

    if (!regexPhone.test(customer_telephone) || isEmpty(customer_telephone)) {
        valid.passed = false
        valid.customer_telephone.passed = false
        valid.customer_telephone.error =
            'Inserisci un numero di telefono valido'
    }

    if (isEmpty(email)) {
        valid.passed = false
        valid.email.passed = false
        valid.email.error = 'Questo campo è obbligatorio'
    }

    if (isEmpty(password) || password.length < 8) {
        valid.passed = false
        valid.pass.passed = false
        valid.pass.error = 'Inserisci una password di almeno 8 caratteri'
    }

    if (!regexPassword.test(password)) {
        valid.passed = false
        valid.pass.passed = false
        valid.pass.error =
            'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.'
    }

    if (!privacy) {
        valid.passed = false
        valid.privacy.passed = false
        valid.privacy.error =
            'accetta i termini e le condizioni per completare la registrazione'
    }

    return valid
}
