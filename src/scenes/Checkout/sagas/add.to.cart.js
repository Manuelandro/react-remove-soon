import qs from 'qs'
import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'
import { addUrl } from 'Config'
import * as c from 'Consts'

/**
 *  Initialize the add to cart flow
 */
function* startAddToCartTask({ payload }) {
    try {
        if (payload.qty > payload.stock) {
            return yield put({
                type: c.CART_ADD_OUT_OF_STOCK,
                payload: { stock: payload.stock },
            })
        }

        return yield put({
            type: c.CART_ADD_REQUEST,
            payload,
        })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.CART_ADD_START_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

/**
 * Execute the post action with parameters
 * product
 * qty
 * form_key
 */
function* addToCartRequestTask({ payload }) {
    try {
        const { data } = yield axios.post(
            addUrl,
            qs.stringify({
                product: payload.id,
                qty: payload.qty,
            }),
        )
        if (data.success === 0) {
            return yield put({
                type: c.CART_ADD_FAILED,
                payload: data,
            })
        }
        yield put({ type: c.CART_ADD_SUCCESS })
        return yield put({ type: c.CART_QUOTE_SAVE, payload: data.quote })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.CART_ADD_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

export default function* rootSaga() {
    yield takeLatest(c.CART_ADD_START, startAddToCartTask)
    yield takeLatest(c.CART_ADD_REQUEST, addToCartRequestTask)
}
