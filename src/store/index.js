import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { routerForBrowser } from 'redux-little-router'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import localForage from 'localforage'
import { catchNotLoggedPayload } from 'Modules/custom-middlewares'
import { rootReducer, rootSaga } from './root'
import { routeList } from '../routes'

const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()

    const { reducer, middleware, enhancer } = routerForBrowser({
        routes: routeList,
    })

    const theReducer = combineReducers({
        ...rootReducer,
        router: reducer,
    })

    return new Promise((resolve, reject) => {
        try {
            const store = createStore(
                theReducer,
                {},
                composeEnhancers(
                    autoRehydrate(),
                    enhancer,
                    applyMiddleware(
                        middleware,
                        sagaMiddleware,
                        catchNotLoggedPayload,
                        thunk,
                    ),
                ),
            )

            sagaMiddleware.run(rootSaga)

            persistStore(
                store,
                {
                    storage: localForage,
                    debounce: 100,
                    blacklist: ['app', 'router'],
                },
                () => resolve(store),
            )
        } catch (e) {
            reject(e)
        }
    })
}

export { history }
