import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'
import { userUrl } from 'Config'
import * as c from 'Consts'

/**
 * Retrieve the customer data needed to use the app
 */
function* customerDataFetchTask() {
    try {
        const { data } = yield axios.get(userUrl)
        if (data.success === 0) {
            return yield put({
                type: c.CUSTOMER_DATA_FETCH_ERROR,
                payload: data,
            })
        }
        yield put({
            type: c.CUSTOMER_DATA_SAVE,
            payload: data,
        })
        return yield put({ type: c.CUSTOMER_DATA_FETCH_COMPLETED })
    } catch (e) {
        return yield put({
            type: c.CUSTOMER_DATA_FETCH_ERROR,
            payload: { error: e },
        })
    }
}

export default function* saga() {
    yield takeLatest(c.CUSTOMER_DATA_FETCH, customerDataFetchTask)
}
