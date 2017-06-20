import pick from 'lodash/pick'
import values from 'lodash/values'
import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'
import { ordersUrl } from 'Config'
import { ofOrder } from 'Schemas'
import * as c from 'Consts'

/**
 * Retrieve the customer orders needed
 */

function* customerOrdersFetchTask() {
    try {
        const { data } = yield axios.get(ordersUrl)

        if (!data || values(data).length === 0) {
            return yield put({
                type: c.CUSTOMER_ORDERS_FETCH_ERROR,
                payload: data,
            })
        }

        yield put({ type: c.CUSTOMER_ORDERS_FETCH_COMPLETED })
        return yield put({
            type: c.CUSTOMER_ORDERS_SAVE,
            payload: values(data).map(object => pick(object, ofOrder)),
        })
    } catch (e) {
        return yield put({
            type: c.CUSTOMER_ORDERS_FETCH_ERROR,
            payload: { error: e },
        })
    }
}

export default function* saga() {
    yield takeLatest(c.CUSTOMER_ORDERS_FETCH, customerOrdersFetchTask)
}
