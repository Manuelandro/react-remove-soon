import { put, takeLatest } from 'redux-saga/effects'
import * as c from 'Consts'

/**
 * Retrieve the customer data needed to use the app
 */
function* customerDataFetchAllTask() {
    try {
        yield put({ type: c.CUSTOMER_DATA_FETCH })
        yield put({ type: c.CUSTOMER_PAYMENT_FETCH })
        yield put({ type: c.CUSTOMER_ORDERS_FETCH })
        return put({ type: c.CUSTOMER_FETCH_ALL_COMPLETE })
    } catch (e) {
        return yield put({
            type: c.CUSTOMER_FETCH_ALL_ERROR,
            payload: { error: e },
        })
    }
}

export default function* saga() {
    yield takeLatest(c.CUSTOMER_FETCH_ALL, customerDataFetchAllTask)
}
