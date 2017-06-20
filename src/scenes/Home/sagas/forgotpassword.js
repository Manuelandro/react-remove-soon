import qs from 'qs'
import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { url } from 'Config'
import * as c from 'Consts'
import { validateForgotPassword } from 'Modules/form-validation'
import { getForgotPasswordForm } from '../selectors'

/**
 *  Initialize the forgot password flow
 */
function* startForgotPasswordTask() {
    try {
        const formData = yield select(getForgotPasswordForm)
        const validation = yield validateForgotPassword(formData)
        if (!validation.passed) {
            return yield put({
                type: c.VALIDATION_FAILED,
                payload: { form: 'forgotpassword', data: validation },
            })
        }
        yield put({
            type: c.VALIDATION_PASSED,
            payload: { form: 'forgotpassword' },
        })
        return yield put({ type: c.GET_FORGOT_PASSWORD_FORM })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.FORGOT_PASSWORD_START_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

/**
 * Retrieve data to use in forgot password request
 */
function* getForgotPasswordFormTask() {
    try {
        const userData = yield select(getForgotPasswordForm)
        return yield put({ type: c.FORGOT_PASSWORD_REQUEST, payload: userData })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.GET_FORGOT_PASSWORD_FORM_ERROR,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

/**
 * Execute the post action with parameters
 * email
 * form_key
 */
function* forgotPasswordRequestTask(action) {
    try {
        const { data } = yield axios.post(
            `${url}/customer/account/forgotpasswordpost`,
            qs.stringify({
                email: action.payload['email'],
            }),
        )
        if (data.success === 0) {
            return yield put({
                type: c.LOGIN_FAILED,
                payload: { error: data.error },
            })
        }
        // yield put({ type: c.SET_LOGGED, payload: { log: data } })
        // yield put({ type: c.LOGIN_SUCCESS })
        // yield put({ type: c.FETCH_PRICES })
        // yield put({ type: c.CUSTOMER_FETCH_ALL })
        // return yield put({
        //     type: c.ROUTER_PUSH,
        //     payload: { pathname: '/catalog' },
        // })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.FORGOT_PASSWORD_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

export default function* saga() {
    yield takeLatest(c.FORGOT_PASSWORD_START, startForgotPasswordTask)
    yield takeLatest(c.GET_FORGOT_PASSWORD_FORM, getForgotPasswordFormTask)
    yield takeLatest(c.FORGOT_PASSWORD_REQUEST, forgotPasswordRequestTask)
}
