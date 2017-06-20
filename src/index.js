import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { RouterProvider } from 'redux-little-router'
import { USER_ARRIVED, FETCH_STOCK } from 'Consts'
import configureStore, { history } from './store'
import App from './app'
import Routes from './routes'

// import { whyDidYouUpdate } from 'why-did-you-update'

async function init() {
    const store = await configureStore()
    const container = document.getElementById('maincontent')

    if (container === null) {
        return
    }

    /* dispatch the initial bootstraping action */
    store.dispatch({ type: USER_ARRIVED })
    /* set a cycle dispatch for the catalog inventgory */
    setInterval(() => store.dispatch({ type: FETCH_STOCK }), 6e4)

    // whyDidYouUpdate(React, { exclude: /^RelativeFragment/ })

    render(
        <Provider store={store}>
            <RouterProvider store={store} history={history}>
                <App>
                    <Routes />
                </App>
            </RouterProvider>
        </Provider>,
        container,
    )
}

$(document).ready(() => {
    init()
})
