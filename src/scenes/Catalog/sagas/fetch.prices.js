import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { pricesUrl } from 'Config'
import * as c from 'Consts'
import { isCatalogFetched } from 'Selectors'

/**
 * Check if the user has already
 * fetched the catalog
 */
function* getCatalogFetchedTask() {
    try {
        const fetched = yield select(isCatalogFetched)
        if (!fetched) {
            yield put({
                type: c.GET_CATALOG_FETCHED_ERROR,
                payload: {
                    log: fetched,
                },
            })
            return yield put({ type: c.FETCH_PRICES_END })
        }
        return yield put({
            type: c.FETCH_PRICES_REQUEST,
            payload: { log: fetched },
        })
    } catch (e) {
        const error = yield { ...e }
        yield put({
            type: c.GET_CATALOG_FETCHED_ERROR,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
        return yield put({ type: c.FETCH_PRICES_END })
    }
}

/**
 * Fetch the catalog prices from API
 */
function* fetchPricesTask() {
    try {
        const { data } = yield axios.get(pricesUrl, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })

        if (!data.items || data.items.length === 0) {
            yield put({
                type: c.FETCH_PRICES_ERROR,
                payload: data.error,
            })
            return yield put({ type: c.FETCH_PRICES_END })
        }
        yield put({ type: c.FETCH_PRICES_COMPLETE })
        return yield put({ type: c.SAVE_PRICES, payload: data.items })
    } catch (e) {
        const error = yield { ...e }
        yield put({
            type: c.FETCH_PRICES_ERROR,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
        return yield put({ type: c.FETCH_PRICES_END })
    }
}

export default function* saga() {
    yield takeLatest(c.FETCH_PRICES, getCatalogFetchedTask)
    yield takeLatest(c.FETCH_PRICES_REQUEST, fetchPricesTask)
}
