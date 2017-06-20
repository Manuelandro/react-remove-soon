import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'
import { url } from 'Config'
import * as c from 'Consts'

/**
 *  Initialize the login flow
 */
function* startLogoutTask() {
    try {
        return yield put({ type: c.LOGOUT_REQUEST })
    } catch (e) {
        const error = yield { ...e }
        yield put({
            type: c.LOGOUT_START_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
        return yield put({ type: c.LOGOUT_END })
    }
}

/**
 * Execute the post action with no parameters
 */
function* logoutRequestTask() {
    try {
        const { data } = yield axios.get(`${url}/auth/logout`)
        if (data.success === 0) {
            yield put({
                type: c.LOGOUT_FAILED,
                payload: data,
            })
            return yield put({ type: c.LOGOUT_END })
        }
        yield put({ type: c.NOT_LOGGED })
        yield put({
            type: c.ROUTER_PUSH,
            payload: { pathname: '/' },
        })
        yield put({ type: c.LOGOUT_SUCCESS })
        return yield put({ type: c.LOGOUT_END })
    } catch (e) {
        const error = yield { ...e }
        yield put({
            type: c.LOGOUT_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
        return yield put({ type: c.LOGOUT_END })
    }
}

export default function* rootSaga() {
    yield takeLatest(c.LOGOUT_START, startLogoutTask)
    yield takeLatest(c.LOGOUT_REQUEST, logoutRequestTask)
}
