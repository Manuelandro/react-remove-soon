import assign from 'lodash/assign'
import axios from 'axios'
import { put, select, takeLatest } from 'redux-saga/effects'
import { shippingUrl, savedPaymUrl } from 'Config'
import * as c from 'Consts'
import { getUser, makeGetCartSelector } from 'Selectors'
import { updateShippingData, updatePaymentData } from '../reducer'

/**
 *  Initialize the place order flow
 */
function* startCheckoutTask() {
    try {
        // get the state form redux store
        const customerData = yield select(getUser)
        // get the state form redux store
        const getCartSelector = yield makeGetCartSelector()
        const cartData = yield select(getCartSelector)
        // then trigger send payment with payload
        return yield put({
            type: c.CHECKOUT_SEND_SHIPPING,
            payload: assign(customerData, cartData),
        })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.CHECKOUT_START_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

function* sendShippingTask(action) {
    try {
        const { data } = yield axios.post(
            shippingUrl,
            updateShippingData(action.payload),
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                },
            },
        )

        return yield put({
            type: c.CHECKOUT_SEND_PAYMENT,
            payload: action.payload,
        })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.CHECKOUT_SEND_SHIPPING_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

function* sendPaymentTask(action) {
    try {
        const { data } = yield axios.post(
            savedPaymUrl,
            updatePaymentData(action.payload),
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                },
            },
        )
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.CHECKOUT_SEND_SHIPPING_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

export default function* saga() {
    yield takeLatest(c.CHECKOUT_START, startCheckoutTask)
    yield takeLatest(c.CHECKOUT_SEND_SHIPPING, sendShippingTask)
    yield takeLatest(c.CHECKOUT_SEND_PAYMENT, sendPaymentTask)
}
