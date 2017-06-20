import axios from 'axios'
import { put, select } from 'redux-saga/effects'
import { loggedUrl, routeAfterLogin, pathname, expire } from 'Config'
import * as c from 'Consts'
import clientExpired from './lib/client.expired'
import { getLogged } from './lib/selectors'

const routerPush = (payload = {}) => put({ type: c.ROUTER_PUSH, payload })
const setLogged = () => put({ type: c.SET_LOGGED })
const alreadyLogged = () => put({ type: c.ALREADY_LOGGED })
const notLogged = () => put({ type: c.NOT_LOGGED })
const appLoaded = () => put({ type: c.APP_LOADED })
const getLoggedError = e => put({ type: c.GET_LOGGED_ERROR, error: e })
const fetchCatalog = () => put({ type: c.PULL_CATALOG })
const fetchUser = () => put({ type: c.CUSTOMER_DATA_FETCH })
const fetchPrices = () => put({ type: c.FETCH_PRICES })

export default function userArrivedTaskGenerator() {
    const isHome = pathname === '/'

    return function* () {
        try {
            // fetch the catalog if is not in store
            yield fetchCatalog()
            // get the state form redux store
            const customerData = yield select(getLogged)
            // check if the client data are still valid
            if (!clientExpired(customerData, expire)) {
                // if the user is logged and in home page
                if (isHome) yield routerPush(routeAfterLogin)

                // fetch again and save
                // the action dispatched goes and proceed outside
                yield fetchUser()

                // get the fresh prices for the catalog
                yield fetchPrices()

                yield alreadyLogged()
                return yield appLoaded()
            }
            // if the user is not logged by redux store
            // check it by magento api
            const { data } = yield axios.get(loggedUrl)

            if (data.success === 1) {
                // if the user is logged synchronize the redux store
                yield setLogged()
                // and if he is in home page redirect him to category
                if (isHome) yield routerPush(routeAfterLogin)

                // fetch again and save
                // the action dispatched goes and proceed outside
                yield fetchUser()

                // get the fresh prices for the catalog
                yield fetchPrices()

                yield alreadyLogged()
                return yield appLoaded()
            }
            // if the user is logged and request a different page from home
            if (!isHome) yield routerPush({ pathname: '/' })

            yield notLogged()
            return yield appLoaded()
        } catch (e) {
            yield getLoggedError(e)
            return yield appLoaded()
        }
    }
}
