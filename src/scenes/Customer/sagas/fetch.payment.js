import pick from 'lodash/pick'
import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'
import { paymentUrl } from 'Config'
import { ofCard } from 'Schemas'
import * as c from 'Consts'

/**
 * Retrieve the customer orders needed
 */

function* customerPaymentFetchTask() {
    try {
        const { data } = yield axios.get(paymentUrl)

        if (!data.payment) {
            return yield put({
                type: c.CUSTOMER_PAYMENT_FETCH_ERROR,
                payload: data,
            })
        }

        const cards = data.payment.adyenOneclick.billingAgreements

        yield put({ type: c.CUSTOMER_PAYMENT_FETCH_COMPLETED })
        yield put({
            type: c.CUSTOMER_PAYMENT_SAVE,
            payload: cards.map(object => pick(object, ofCard)),
        })

        return yield put({ type: c.FETCH_DOMEC_BALANCE })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.CUSTOMER_PAYMENT_FETCH_ERROR,
            payload: { error: error.response.data.message },
        })
    }
}

export default function* saga() {
    yield takeLatest(c.CUSTOMER_PAYMENT_FETCH, customerPaymentFetchTask)
}
