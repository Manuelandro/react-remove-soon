import { REHYDRATE } from 'redux-persist/constants'
import update from 'react-addons-update'
import * as c from 'Consts'
import initialState from './initialState.json'

const showLoader = state =>
    update(state, { ux: { showRequestLoader: { $set: true } } })

const hideLoader = state =>
    update(state, {
        ux: {
            showRequestLoader: { $set: false },
        },
    })

const hideLoaderWithError = (state, { payload }) =>
    update(state, {
        ux: {
            showRequestLoader: { $set: false },
            error: { $set: payload.error },
        },
    })

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case REHYDRATE:
            return update(state, {
                rehydrated: { $set: true },
            })
        case c.APP_LOADED:
            return update(state, {
                loaded: { $set: true },
            })
        case c.LOGIN_GET_FORM_KEY:
        case c.REGISTER_GET_FORM_KEY:
        case c.LOGOUT_START:
            return showLoader(state)
        case c.SAVE_PRICES:
        case c.LOGOUT_END:
        case c.CUSTOMER_FETCH_ALL_COMPLETE:
        case c.CUSTOMER_DATA_FETCH_ERROR:
        case c.LOGIN_GET_FORM_KEY_ERROR:
        case c.GET_LOGIN_FORM_ERROR:
        case c.LOGOUT_FAILED:
            return hideLoader(state)
        case c.LOGIN_FAILED:
        case c.REGISTER_FAILED:
            return hideLoaderWithError(state, { payload })
        default:
            return state
    }
}
