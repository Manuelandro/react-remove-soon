import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { addDomecUrl } from 'Config'
import * as c from 'Consts'
import { getUserIdSelector } from 'Selectors'

/**
 * Start the save domec card flow
 * retrieving the customer id
 */
function* saveDomecTask(action) {
    try {
        const cardNumber = yield action.payload.card_number

        if (!cardNumber || cardNumber.length !== 12) {
            yield put({
                type: c.SAVE_DOMEC_CARD_INVALID,
            })
            return put({ type: c.SAVE_DOMEC_CARD_END })
        }
        return yield put({
            type: c.SAVE_DOMEC_GET_CUSTOMER,
            payload: {
                card_number: cardNumber,
            },
        })
    } catch (e) {
        const error = yield { ...e }
        yield put({
            type: c.SAVE_DOMEC_CARD_INVALID,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
        return put({ type: c.SAVE_DOMEC_CARD_END })
    }
}

/**
 * retrieving the customer id
 */
function* getCustomerIdTask(action) {
    try {
        const id = yield select(getUserIdSelector)

        if (!id) {
            yield put({
                type: c.SAVE_DOMEC_GET_CUSTOMER_FAILED,
            })
            return put({ type: c.SAVE_DOMEC_CARD_END })
        }
        return yield put({
            type: c.SAVE_DOMEC_REQUEST,
            payload: {
                customer_id: id,
                card_number: action.payload.card_number,
            },
        })
    } catch (e) {
        const error = yield { ...e }
        yield put({
            type: c.SAVE_DOMEC_GET_CUSTOMER_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
        return put({ type: c.SAVE_DOMEC_CARD_END })
    }
}

/**
 * Send customer_id and card number request
 */
function* addDomecRequestTask(action) {
    try {
        const { data } = yield axios.post(addDomecUrl, {
            customerid: action.payload.customer_id,
            card: action.payload.card_number,
        })
        if (data.success !== 1) {
            yield put({
                type: c.SAVE_DOMEC_REQUEST_FAILED,
                payload: data,
            })
        } else {
            yield put({ type: c.SAVE_DOMEC_SUCCESS, payload: data })
        }
        return put({ type: c.SAVE_DOMEC_CARD_END })
    } catch (e) {
        const error = yield { ...e }
        yield put({
            type: c.SAVE_DOMEC_REQUEST_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
        return put({ type: c.SAVE_DOMEC_CARD_END })
    }
}

export default function* saga() {
    yield takeLatest(c.SAVE_DOMEC_CARD, saveDomecTask)
    yield takeLatest(c.SAVE_DOMEC_GET_CUSTOMER, getCustomerIdTask)
    yield takeLatest(c.SAVE_DOMEC_REQUEST, addDomecRequestTask)
}
