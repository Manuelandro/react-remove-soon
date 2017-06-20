import qs from 'qs'
import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { updateUrl } from 'Config'
import * as c from 'Consts'
import { userQtyByIdSelector } from 'Selectors'

/**
 *  Initialize the update qty flow
 */
function* startUpdateQtyTask({ payload }) {
    try {
        // get the state qty from redux store
        const qty = yield select(userQtyByIdSelector(payload.productQuoteId))
        // check if the user is adding or removing qty's
        const method = yield payload.qty < qty ? 'rem' : 'add'

        // if he's adding and he requested more than the inventory
        // stop and dispatch the out of stock action
        if (payload.qty > payload.stock && method === 'add') {
            yield put({
                type: c.CART_UPDATE_OUT_OF_STOCK,
                payload: { inventory: payload.stock },
            })
            return yield put({ type: c.CART_UPDATE_END })
        }

        // if the qty requested is 0, stop and dispatch the remove
        if (payload.qty === 0) {
            return yield put({
                type: c.CART_DELETE_START,
                payload,
            })
        }

        // dispatch and trigger the next task
        return yield put({
            type: c.CART_UPDATE_REQUEST,
            payload,
        })
    } catch (e) {
        yield put({
            type: c.CART_UPDATE_START_FAILED,
            payload: { error: e },
        })
        return yield put({ type: c.CART_UPDATE_END })
    }
}

/**
 * Execute the post action with parameters
 * product
 * qty
 */
function* updateQtyRequestTask({ payload }) {
    try {
        // make the post action with the new qty
        const { data } = yield axios.post(
            updateUrl,
            qs.stringify({
                id: payload.productQuoteId,
                qty: payload.qty,
            }),
        )
        // if the request goes wrong got out
        if (data.success === 0) {
            yield put({
                type: c.CART_UPDATE_FAILED,
                payload: data,
            })
            return yield put({ type: c.CART_UPDATE_END })
        }
        // otherwise dispatch the success
        yield put({ type: c.CART_UPDATE_SUCCESS })
        yield put({ type: c.CART_UPDATE_END })
        // update redux with the new cart quote
        return yield put({ type: c.CART_QUOTE_SAVE, payload: data.quote })
    } catch (e) {
        yield put({ type: c.CART_UPDATE_FAILED, payload: { error: e } })
        return yield put({ type: c.CART_UPDATE_END })
    }
}

export default function* rootSaga() {
    yield takeLatest(c.CART_UPDATE_START, startUpdateQtyTask)
    yield takeLatest(c.CART_UPDATE_REQUEST, updateQtyRequestTask)
}
