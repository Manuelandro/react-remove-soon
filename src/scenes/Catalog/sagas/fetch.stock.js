import axios from 'axios'
import { put, takeLatest, select } from 'redux-saga/effects'
import { stockUrl } from 'Config'
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
            return yield put({ type: c.FETCH_STOCK_END })
        }
        return yield put({
            type: c.FETCH_STOCK_REQUEST,
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
        return yield put({ type: c.FETCH_STOCK_END })
    }
}

/**
 * Fetch the catalog inventory from API
 */
function* fetchStockTask() {
    try {
        const { data } = yield axios.get(stockUrl)

        if (!data || data.length === 0) {
            yield put({
                type: c.FETCH_STOCK_ERROR,
                payload: data,
            })
            return yield put({ type: c.FETCH_STOCK_END })
        }
        yield put({ type: c.FETCH_STOCK_COMPLETE })
        yield put({ type: c.SAVE_STOCK, payload: data })
        return yield put({ type: c.FETCH_STOCK_END })
    } catch (e) {
        const error = yield { ...e }
        yield put({
            type: c.FETCH_STOCK_ERROR,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
        return yield put({ type: c.FETCH_STOCK_END })
    }
}

export default function* saga() {
    yield takeLatest(c.FETCH_STOCK, getCatalogFetchedTask)
    yield takeLatest(c.FETCH_STOCK_REQUEST, fetchStockTask)
}
