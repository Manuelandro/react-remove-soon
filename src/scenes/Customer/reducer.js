import update from 'react-addons-update'
import { domecAsObject, updateDomecBalance } from 'Modules/reducer-utils'
import * as c from 'Consts'
import initialState from './initialState.json'

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case c.NOT_LOGGED:
            return initialState
        case c.SET_LOGGED:
            return update(state, {
                userLogged: { $set: true },
                lastLogged: { $set: Math.round(+new Date() / 1000) },
            })
        case c.CUSTOMER_DATA_SAVE:
            return update(state, {
                id: { $set: parseInt(payload.customer.id, 10) },
                firstname: { $set: payload.customer.firstname },
                lastname: { $set: payload.customer.lastname },
                email: { $set: payload.customer.email },
                customer_telephone: {
                    $set: payload.customer.customer_telephone,
                },
                eatalyCards: { $set: domecAsObject(payload.domec) || [] },
            })
        case c.CUSTOMER_ORDERS_SAVE:
            return update(state, {
                orders: { $set: payload },
            })
        case c.CUSTOMER_PAYMENT_SAVE:
            return update(state, {
                creditCards: { $set: payload },
            })
        case c.FETCH_DOMEC_BALANCE_SUCCESS:
            return update(state, {
                eatalyCards: { $set: updateDomecBalance(state, payload) },
            })
        default:
            return state
    }
}
