import { fork } from 'redux-saga/effects'
// reducers
import appReducer from '../app/reducer'
import homeReducer from '../scenes/Home/reducer'
import catalogReducer from '../scenes/Catalog/reducer'
import customerReducer from '../scenes/Customer/reducer'
import checkoutReducer from '../scenes/Checkout/reducer'

// sagas
import appSaga from '../app/saga'
import loginSaga from '../scenes/Home/sagas/login'
import registerSaga from '../scenes/Home/sagas/register'
import forgotpasswordSaga from '../scenes/Home/sagas/forgotpassword'
import logoutSaga from '../scenes/Customer/sagas/logout'

import fetchAllSaga from '../scenes/Customer/sagas/fetch.all'
import fetchUserSaga from '../scenes/Customer/sagas/fetch.customer'
import fetchOrdersSaga from '../scenes/Customer/sagas/fetch.orders'
import fetchPaymentSaga from '../scenes/Customer/sagas/fetch.payment'
import fetchDomecBalanceSaga from '../scenes/Customer/sagas/fetch.domec.balance'
import editPasswordSaga from '../scenes/Customer/sagas/edit.password'
import fetchCatalogSaga from '../scenes/Catalog/sagas/fetch.catalog'
import fetchPricesSaga from '../scenes/Catalog/sagas/fetch.prices'
import fetchStockSaga from '../scenes/Catalog/sagas/fetch.stock'
import saveDomecSaga from '../scenes/Customer/sagas/domec'
import addToCartSaga from '../scenes/Checkout/sagas/add.to.cart'
import updateQtySaga from '../scenes/Checkout/sagas/update.qty'
import deleteSaga from '../scenes/Checkout/sagas/delete'
import couponSaga from '../scenes/Checkout/sagas/coupon'
import checkoutSaga from '../scenes/Checkout/sagas/checkout.flow'

const startSagas = (...sagas) =>
    function* rootSaga() {
        yield sagas.map(saga => fork(saga))
    }

export const rootReducer = {
    app: appReducer,
    home: homeReducer,
    catalog: catalogReducer,
    customer: customerReducer,
    checkout: checkoutReducer,
}

export const rootSaga = startSagas(
    appSaga,
    loginSaga,
    registerSaga,
    forgotpasswordSaga,
    logoutSaga,
    fetchAllSaga,
    fetchUserSaga,
    fetchOrdersSaga,
    fetchPaymentSaga,
    fetchDomecBalanceSaga,
    editPasswordSaga,
    fetchCatalogSaga,
    fetchPricesSaga,
    fetchStockSaga,
    saveDomecSaga,
    addToCartSaga,
    updateQtySaga,
    deleteSaga,
    couponSaga,
    checkoutSaga,
)
