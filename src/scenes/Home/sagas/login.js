import qs from 'qs'
import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { url } from 'Config'
import * as c from 'Consts'
import { validateLogin } from 'Modules/form-validation'
import { getLoginForm } from '../selectors'

/**
 *  Initialize the login flow
 */
function* startLoginTask() {
    try {
        const formData = yield select(getLoginForm)
        const validation = yield validateLogin(formData)
        if (!validation.passed) {
            return yield put({
                type: c.VALIDATION_FAILED,
                payload: { form: 'login', data: validation },
            })
        }
        yield put({ type: c.VALIDATION_PASSED, payload: { form: 'login' } })
        return yield put({ type: c.LOGIN_GET_FORM_KEY })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.LOGIN_START_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

/**
 * Retrieve a fresh form_key
 */
function* getFormKeyTask() {
    try {
        const { data } = yield axios.get(`${url}/form/key`)
        if (data.success === 0) {
            return yield put({
                type: c.LOGIN_GET_FORM_KEY_ERROR,
                payload: data,
            })
        }
        yield put({ type: c.SET_FORM_KEY, payload: data.formKey })
        return yield put({ type: c.GET_LOGIN_FORM })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.LOGIN_GET_FORM_KEY_ERROR,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

/**
 * Retrieve data to use in login request
 */
function* getLoginFormTask() {
    try {
        const userData = yield select(getLoginForm)
        return yield put({ type: c.LOGIN_REQUEST, payload: userData })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.GET_LOGIN_FORM_ERROR,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

/**
 * Execute the post action with parameters
 * login[username]
 * login[password]
 * form_key
 */
function* loginRequestTask(action) {
    try {
        const { data } = yield axios.post(
            `${url}/auth/login`,
            qs.stringify({
                form_key: action.payload['form_key'],
                'login[username]': action.payload['login[username]'],
                'login[password]': action.payload['login[password]'],
            }),
        )
        if (data.success === 0) {
            return yield put({
                type: c.LOGIN_FAILED,
                payload: data,
            })
        }
        yield put({ type: c.SET_LOGGED, payload: { log: data } })
        yield put({ type: c.LOGIN_SUCCESS })
        yield put({ type: c.FETCH_PRICES })
        yield put({ type: c.CUSTOMER_FETCH_ALL })
        return yield put({
            type: c.ROUTER_PUSH,
            payload: { pathname: '/catalog' },
        })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.LOGIN_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

export default function* saga() {
    yield takeLatest(c.LOGIN_START, startLoginTask)
    yield takeLatest(c.LOGIN_GET_FORM_KEY, getFormKeyTask)
    yield takeLatest(c.GET_LOGIN_FORM, getLoginFormTask)
    yield takeLatest(c.LOGIN_REQUEST, loginRequestTask)
}
