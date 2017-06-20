import has from 'lodash/has'
import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { keyUrl, editUrl } from 'Config'
import * as c from 'Consts'
import { getUserIdSelector } from 'Selectors'

/**
 * Start the edit password flow
 */
function* customerEditPasswordTask(action) {
    try {
        const id = yield select(getUserIdSelector)
        const data = action.payload

        if (
            !id ||
            !data ||
            !has(data, 'currentPassword') ||
            !has(data, 'newPassword') ||
            !has(data, 'comnfirm')
        ) {
            return yield put({
                type: c.FETCH_PASSWORD_FORM_ERROR,
            })
        }
        return yield put({
            type: c.EDIT_PASSWORD_FORM_KEY,
            payload: { ...data, customer_id: id },
        })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.EDIT_PASSWORD_ERROR,
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
function* getFormKeyTask(action) {
    try {
        const { data } = yield axios.get(keyUrl)
        if (data.success === 0) {
            return yield put({
                type: c.EDIT_PASSWORD_FORM_KEY_ERROR,
                payload: data,
            })
        }
        yield put({ type: c.SET_FORM_KEY, payload: data.formKey })
        return yield put({
            type: c.EDIT_PASSWORD_REQUEST,
            payload: action.payload,
        })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.EDIT_PASSWORD_FORM_KEY_ERROR,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

/**
 * Execute the put action with parameters
 * customer_id
 * currentPassword
 * newPassword
 */
function* putNewPasswordTask(action) {
    try {
        const setPassword = yield axios.put(editUrl, action.payload)

        if (setPassword.data !== true) {
            return yield put({
                type: c.EDIT_PASSWORD_REQUEST_FAILED,
                payload: {
                    error: setPassword.response.data.message,
                    status: setPassword.response.status,
                },
            })
        }

        return yield put({ type: c.EDIT_PASSWORD_SUCCESS })
    } catch (e) {
        const error = yield { ...e }
        return yield put({
            type: c.EDIT_PASSWORD_FAILED,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
    }
}

export default function* saga() {
    yield takeLatest(c.EDIT_PASSWORD_START, customerEditPasswordTask)
    yield takeLatest(c.EDIT_PASSWORD_FORM_KEY, getFormKeyTask)
    yield takeLatest(c.EDIT_PASSWORD_REQUEST, putNewPasswordTask)
}
