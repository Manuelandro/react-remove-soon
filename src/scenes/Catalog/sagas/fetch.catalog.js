import axios from 'axios'
import keys from 'lodash/keys'
import { put, takeLatest, select } from 'redux-saga/effects'
import { catalogUrl } from 'Config'
import { ofProduct } from 'Schemas'
import * as c from 'Consts'
import { isCatalogFetched } from 'Selectors'
import { getProductAttributes } from 'Modules/catalog'

/**
 * Check if the user has already
 * fetched the catalog
 */
function* getCatalogFetchedTask() {
    try {
        const fetched = yield select(isCatalogFetched)
        if (fetched) {
            yield put({
                type: c.CATALOG_ALREADY_FETCHED,
                payload: {
                    log: fetched,
                },
            })
            return yield put({ type: c.PULL_CATALOG_END })
        }
        return yield put({
            type: c.PULL_CATALOG_REQUEST,
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
        return yield put({ type: c.PULL_CATALOG_END })
    }
}

/**
 * Fetch the catalog from API
 */
function* fetchCatalogTask() {
    try {
        const { data } = yield axios.get(catalogUrl)

        if (!data || keys(data).length === 0) {
            yield put({
                type: c.PULL_CATALOG_ERROR,
                payload: data,
            })
            return yield put({ type: c.PULL_CATALOG_END })
        }

        const items = yield getProductAttributes(data, ofProduct)

        yield put({
            type: c.SAVE_CATALOG,
            payload: items,
        })
        return yield put({ type: c.FETCH_STOCK })
    } catch (e) {
        const error = yield { ...e }
        yield put({
            type: c.PULL_CATALOG_ERROR,
            payload: {
                error: error.response.data.message,
                status: error.response.status,
            },
        })
        return yield put({ type: c.PULL_CATALOG_END })
    }
}

export default function* saga() {
    yield takeLatest(c.PULL_CATALOG, getCatalogFetchedTask)
    yield takeLatest(c.PULL_CATALOG_REQUEST, fetchCatalogTask)
}
