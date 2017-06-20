import qs from 'qs'
import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { deleteUrl } from 'Config'
import * as c from 'Consts'
import { haveItByIdSelector } from 'Selectors'

/**
 *  Initialize the update qty flow
 */
function* startDeleteTask({ payload }) {
    try {
        // get the state product from redux store
        const data = yield select(haveItByIdSelector(payload.productQuoteId))

        // dispatch failed if no product were found
        if (data.length === 0) {
            return yield put({
                type: c.CART_DELETE_START_FAILED,
            })
        }

        // dispatch and trigger the next task
        return yield put({
            type: c.CART_DELETE_REQUEST,
            payload,
        })
    } catch (e) {
        return yield put({
            type: c.CART_UPDATE_START_FAILED,
            payload: { error: e },
        })
    }
}

/**
 * Execute the post action with parameter
 * product
 */
function* deleteRequestTask({ payload }) {
    try {
        const { data } = yield axios.post(
            deleteUrl,
            qs.stringify({
                id: payload.productQuoteId,
            }),
        )
        if (data.success === 0) {
            return yield put({
                type: c.CART_DELETE_FAILED,
                payload: data,
            })
        }
        yield put({ type: c.CART_DELETE_SUCCESS })
        return yield put({ type: c.CART_QUOTE_SAVE, payload: data.quote })
    } catch (e) {
        return yield put({ type: c.CART_DELETE_FAILED, payload: { error: e } })
    }
}

export default function* rootSaga() {
    yield takeLatest(c.CART_DELETE_START, startDeleteTask)
    yield takeLatest(c.CART_DELETE_REQUEST, deleteRequestTask)
}
