import hasIn from 'lodash/hasIn'
import { LOGOUT_START } from 'Consts'

export const catchNotLoggedPayload = store => next => (action) => {
    const { payload } = action

    if (hasIn(payload, 'error') && hasIn(payload, 'not_logged')) {
        if (payload.not_logged === 1) {
            store.dispatch({ type: LOGOUT_START })
        }
    }

    if (hasIn(payload, 'status')) {
        if (payload.status === 401) {
            store.dispatch({ type: LOGOUT_START })
        }
    }

    return next(action)
}
