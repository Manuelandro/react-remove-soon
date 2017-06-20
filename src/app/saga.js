import { takeLatest } from 'redux-saga/effects'
import * as c from 'Consts'
import userArrivedTaskGenerator from 'Modules/user-arrived'

/**
 * Check if the user is already logged
 * both from client and server
 */
const userArrivedTask = userArrivedTaskGenerator()

export default function* saga() {
    yield takeLatest(c.USER_ARRIVED, userArrivedTask)
}
