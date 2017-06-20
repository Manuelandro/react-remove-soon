import isEmpty from 'lodash/isEmpty'

export default function (data) {
    const { firstname, lastname, email } = data
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!re.test(email)) {
        return false
    }

    if (isEmpty(firstname)) {
        return false
    }

    if (isEmpty(lastname)) {
        return false
    }

    return true
}
