import hasIn from 'lodash/hasIn'

export const validateEnter = (ev, cb) => {
    if (!ev || !hasIn(ev, 'charCode')) {
        return false
    }

    if (ev.charCode === 13) {
        cb()
        return true
    }

    return false
}
