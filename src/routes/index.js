import React from 'react'
import { Fragment } from 'redux-little-router'
import Home from '../scenes/Home/'
import Catalog from '../scenes/Catalog/'
import Customer from '../scenes/Customer/'
import Checkout from '../scenes/Checkout/'

export const routeList = {
    '/': {
        title: 'Home',
    },
    '/catalog': {
        title: 'Catalog',
        '/product/view/id/:id': {
            title: 'Product',
        },
    },
    '/customer': {
        title: 'Customer',
    },
    '/checkout': {
        title: 'Checkout',
    },
}

export default () => (
    <div>
        <Fragment
          forRoute="/"
          withConditions={({ pathname }) => pathname === '/'}
        >
            <Home />
        </Fragment>
        <Fragment
          forRoute="/catalog"
          withConditions={({ pathname }) => pathname === '/catalog'}
        >
            <Catalog />
        </Fragment>
        <Fragment forRoute="/catalog/product/view/id/:id">
            <Catalog isProduct />
        </Fragment>
        <Fragment forRoute="/customer">
            <Customer />
        </Fragment>
        <Fragment forRoute="/checkout">
            <Checkout />
        </Fragment>
    </div>
)
