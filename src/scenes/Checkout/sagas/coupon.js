import hasIn from 'lodash/hasIn'
import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { couponUrl } from 'Config'
import { makeGetCartSelector } from 'Selectors'
import * as c from 'Consts'

function* startCouponTask(action) {
    try {
        const getCartSelector = yield makeGetCartSelector()
        const data = yield select(getCartSelector)

        if (!hasIn(data, 'coupon')) {
            yield put({
                type: c.COUPON_TOGGLE_ERROR,
                payload: 'No coupon property',
            })
            return put({ type: c.COUPON_TOGGLE_END })
        }

        if (data.coupon.length === 0) {
            // add
            return yield put({
                type: c.COUPON_TOGGLE_REQUEST,
                payload: `?coupon_code=${action.payload}`,
            })
        }
        // remove
        return yield put({
            type: c.COUPON_TOGGLE_REQUEST,
            payload: '?remove=1',
        })
    } catch (e) {
        const error = yield { ...e }

        return yield put({
            type: c.COUPON_TOGGLE_ERROR,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

function* couponRequestTask(action) {
    try {
        const { data } = yield axios.get(`${couponUrl}${action.payload}`)

        if (!data || data.success === 0) {
            yield put({ type: c.COUPON_TOGGLE_ERROR, payload: data })
            return put({ type: c.COUPON_TOGGLE_END })
        }

        yield put({
            type: c.COUPON_TOGGLE_SUCCESS,
            payload: data,
        })
        return put({ type: c.COUPON_TOGGLE_END })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.COUPON_TOGGLE_ERROR,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

export default function* saga() {
    yield takeLatest(c.COUPON_TOGGLE, startCouponTask)
    yield takeLatest(c.COUPON_TOGGLE_REQUEST, couponRequestTask)
}
