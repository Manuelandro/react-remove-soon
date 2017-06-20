import qs from 'qs'
import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { url } from 'Config'
import * as c from 'Consts'
import { validateRegister } from 'Modules/form-validation'
import { getRegisterForm } from '../selectors'

/**
 *  Initialize the register flow
 */
function* startRegisterTask() {
    try {
        const formData = yield select(getRegisterForm)
        const validation = yield validateRegister(formData)
        if (!validation.passed) {
            return yield put({
                type: c.VALIDATION_FAILED,
                payload: { form: 'register', data: validation },
            })
        }
        yield put({
            type: c.VALIDATION_PASSED,
            payload: { form: 'register', data: validation },
        })
        return yield put({ type: c.REGISTER_GET_FORM_KEY })
    } catch (e) {
        return yield put({
            type: c.REGISTER_START_FAILED,
            payload: { error: e },
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
                type: c.REGISTER_GET_FORM_KEY_ERROR,
                payload: data,
            })
        }
        yield put({ type: c.SET_FORM_KEY, payload: data.formKey })
        return yield put({ type: c.GET_REGISTER_FORM })
    } catch (e) {
        return yield put({
            type: c.REGISTER_GET_FORM_KEY_ERROR,
            payload: { error: e },
        })
    }
}

/**
 * Retrieve data to use in login request
 */
function* getRegisterFormTask() {
    try {
        const userData = yield select(getRegisterForm)
        try {
            const { data } = yield axios.post(
                `${url}/auth/registration`,
                qs.stringify({
                    data: userData,
                }),
            )
            if (data.success === 0) {
                return yield put({
                    type: c.REGISTER_FAILED,
                    payload: data,
                })
            }
            yield put({ type: c.SET_LOGGED, payload: { log: data } })
            yield put({ type: c.REGISTER_SUCCESS })
            yield put({ type: c.CUSTOMER_DATA_FETCH })
            return yield put({
                type: c.ROUTER_PUSH,
                payload: { pathname: '/catalog' },
            })
        } catch (e) {
            return yield put({ type: c.REGISTER_FAILED, payload: { error: e } })
        }
    } catch (e) {
        return yield put({
            type: c.GET_REGISTER_FORM_ERROR,
            payload: { error: e },
        })
    }
}

export default function* rootSaga() {
    yield takeLatest(c.REGISTER_START, startRegisterTask)
    yield takeLatest(c.REGISTER_GET_FORM_KEY, getFormKeyTask)
    yield takeLatest(c.GET_REGISTER_FORM, getRegisterFormTask)
}
