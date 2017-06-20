import update from 'react-addons-update'
import * as c from 'Consts'
import { ofSendShipping, ofSendPayment } from 'Schemas'
import initialState from './initialState.json'

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case c.CART_QUOTE_SAVE:
            return update(state, {
                cart: { $set: parseInt(payload.cart, 10) },
                isActive: { $set: parseInt(payload.isActive, 10) },
                coupon: { $set: payload.coupon || '' },
                baseTotal: { $set: payload.baseTotal },
                total: { $set: payload.total },
                items: { $set: payload.items },
            })
        case c.CUSTOMER_DATA_SAVE:
            if (!payload.quote) return state
            return update(state, {
                cart: { $set: parseInt(payload.quote.quoteId, 10) },
                isActive: { $set: parseInt(payload.quote.isActive, 10) },
                coupon: { $set: payload.quote.coupon || '' },
                baseTotal: { $set: payload.quote.baseTotal },
                total: { $set: payload.quote.total },
                items: { $set: payload.quote.items },
            })
        case c.COUPON_TOGGLE_SUCCESS:
            return update(state, {
                total: { $set: payload.quote.total },
                coupon: { $set: payload.quote.coupon || '' },
            })
        default:
            return state
    }
}

/*
 * checkout saga - update objects
 */
export const updateShippingData = (data) => {
    const { id, customer_telephone, firstname, lastname } = data
    return update(ofSendShipping, {
        addressInformation: {
            shipping_address: {
                customerId: { $set: id },
                telephone: { $set: customer_telephone },
                firstname: { $set: firstname },
                lastname: { $set: lastname },
            },
            billing_address: {
                customerId: { $set: id },
                telephone: { $set: customer_telephone },
                firstname: { $set: firstname },
                lastname: { $set: lastname },
            },
        },
    })
}

export const updatePaymentData = (data) => {
    const { id, customer_telephone, firstname, lastname, cart } = data
    return update(ofSendPayment, {
        cartId: { $set: cart },
        billing_address: {
            customerId: { $set: id },
            telephone: { $set: customer_telephone },
            firstname: { $set: firstname },
            lastname: { $set: lastname },
        },
    })
}
