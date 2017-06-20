import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { balanceDomecUrl } from 'Config'
import { makeGetUserSelector } from 'Selectors'
import * as c from 'Consts'

/**
 * Retrieve the customer data needed to use the app
 */
function* domecFetchBalanceTask() {
    try {
        const getUserSelector = yield makeGetUserSelector()
        const data = yield select(getUserSelector)

        if (!data.eatalyCards.length) {
            return yield put({
                type: c.FETCH_DOMEC_BALANCE_END,
                payload: 'No eataly cards',
            })
        }

        return yield put({
            type: c.FETCH_DOMEC_BALANCE_REQUEST,
            payload: data.eatalyCards,
        })
    } catch (e) {
        return yield put({
            type: c.FETCH_DOMEC_BALANCE_ERROR,
            payload: { error: e },
        })
    }
}

function* domecFetchBalanceRequestTask(action) {
    try {
        const balances = yield action.payload.map(function* aj(val) {
            const { data } = yield axios.get(
                `${balanceDomecUrl}?card=${val.webSerialNumber}`,
            )
            return data
        })

        if (!balances) {
            yield put({
                type: c.FETCH_DOMEC_BALANCE_ERROR,
                payload: balances,
            })
            return yield put({ type: c.FETCH_DOMEC_BALANCE_END })
        }
        yield put({ type: c.FETCH_DOMEC_BALANCE_SUCCESS, payload: balances })
        return yield put({ type: c.FETCH_DOMEC_BALANCE_END })
    } catch (e) {
        return yield put({
            type: c.FETCH_DOMEC_BALANCE_ERROR,
            payload: { error: e },
        })
    }
}

export default function* saga() {
    yield takeLatest(c.FETCH_DOMEC_BALANCE, domecFetchBalanceTask)
    yield takeLatest(
        c.FETCH_DOMEC_BALANCE_REQUEST,
        domecFetchBalanceRequestTask,
    )
}
