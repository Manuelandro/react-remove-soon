import pick from 'lodash/pick'
import keys from 'lodash/keys'
import values from 'lodash/values'
import { createSelector } from 'reselect'

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MEMOIZED APP SELECTORS
 * reselect docs https://github.com/reactjs/reselect
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

/* get if the app is loaded */
export const loadedSelector = createSelector(
    state => state.app.loaded,
    memoizedLoaded => memoizedLoaded,
)

/* get app loader shown or hided */
export const requestLoaderSelector = createSelector(
    state => state.app.ux.showRequestLoader,
    memoizedLoader => memoizedLoader,
)

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MEMOIZED ROUTER SELECTORS
 * reselect docs https://github.com/reactjs/reselect
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const currentRouteSelector = createSelector(
    state => state.router,
    memoizedRouter => memoizedRouter.route,
)

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MEMOIZED HOME SELECTORS
 * reselect docs https://github.com/reactjs/reselect
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

/* get the login form values */
export const loginFormSelector = createSelector(
    state => state.home.login,
    memoizedLogin => memoizedLogin,
)

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MEMOIZED CATALOG SELECTORS
 * reselect docs https://github.com/reactjs/reselect
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

/* check if the catalog has been fetched */
export const isCatalogFetched = createSelector(
    state => state.catalog.fetched,
    fetched => fetched,
)

/* get the current active filters */
export const filtersSelector = createSelector(
    catalogState => catalogState.ux.filters,
    filters => filters || [],
)

/* get all the products */
export const productsSelector = createSelector(
    state => state.catalog.products,
    memoizedProducts => memoizedProducts,
)

/* get the single product by id */
export const singleProductSelector = createSelector(
    [
        state => state.catalog.products,
        state => parseInt(state.router.params.id, 10),
    ],
    (memoizedProducts, id) => {
        const data = values(memoizedProducts).filter(val => val.id === id)
        return data[0]
    },
)

export const oneclickSelector = createSelector(
    state => state.catalog.ux.oneclick,
    memoizedOneclick => memoizedOneclick,
)

/* get the product id in quote by sku */
export const productIdQuoteSelector = createSelector(
    [state => state.checkout.items, (checkoutState, ownProps) => ownProps.sku],
    (memoizedItems, sku) => {
        const prod = keys(memoizedItems).length > 0 ? memoizedItems[sku] : {}
        return prod ? parseInt(prod.id, 10) : 0
    },
)

/* get - if there is - the product which is current updating qty */
export const productUpdatingSelector = createSelector(
    state => state.catalog.ux,
    memoizedUx => parseInt(memoizedUx.productUpdating, 10),
)

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MEMOIZED CHECKOUT SELECTORS
 * reselect docs https://github.com/reactjs/reselect
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

/* get the current cart object */
export const makeGetCartSelector = () =>
    createSelector(state => state.checkout, memoizedCeckout => memoizedCeckout)

/* get the total qty of items in cart */
export const cartCounterSelector = createSelector(
    state => values(state.checkout.items).map(val => val.qty),
    memoizedQty => memoizedQty.reduce((a, b) => a + b),
)

/* get if the user has the product by sku */
export const haveItBySkuSelector = createSelector(
    [state => state.checkout.items, (state, ownProps) => ownProps.sku],
    (memoizedItems, sku) =>
        keys(memoizedItems).filter(val => val === sku).length > 0,
)

/* get if the user has the product by id */
export const haveItByIdSelector = id =>
    createSelector(
        state => state.checkout.items,
        memoizedItems =>
            values(memoizedItems).filter(val => parseInt(val.id, 10) === id),
    )

/* get the qty that user has of product by sku */
export const userQtyBySkuSelector = createSelector(
    [state => state.checkout.items, (checkoutState, ownProps) => ownProps.sku],
    (memoizedItems, sku) => {
        const prod = keys(memoizedItems).length > 0 ? memoizedItems[sku] : {}
        return prod ? prod.qty : 0
    },
)

/* get the qty that user has of product by id */
export const userQtyByIdSelector = id =>
    createSelector(
        state => state.checkout.items,
        (memoizedItems) => {
            const item = values(memoizedItems).filter(
                val => parseInt(val.id, 10) === id,
            )

            return item ? item.qty : 0
        },
    )

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MEMOIZED CUSTOMER SELECTORS
 * reselect docs https://github.com/reactjs/reselect
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

/* get the user object with only specific properties */
export const makeGetUserSelector = () =>
    createSelector(
        state => state.customer,
        memoizedCustomer => memoizedCustomer,
    )

export const loggedSelector = createSelector(
    state => state.customer.userLogged,
    memoizedLogged => memoizedLogged,
)

export const loggedAndHasQuoteSelector = createSelector(
    [state => state.customer, state => state.checkout],
    (memoizedCustomer, memoizedCeckout) =>
        memoizedCustomer.userLogged && keys(memoizedCeckout.items).length > 0,
)

/* get the user object with only specific properties */
export const getUser = createSelector(
    state => state.customer,
    memoizedCustomer =>
        pick(memoizedCustomer, [
            'id',
            'firstname',
            'lastname',
            'customer_telephone',
        ]),
)

/* get the user firstname */
export const userNameSelector = createSelector(
    state => state.customer.firstname,
    memoizedName => memoizedName,
)

/* get the entire user object */
export const customerSelector = createSelector(
    state => state.customer,
    memoizedCustomer => memoizedCustomer,
)

/* get the user id */
export const getUserIdSelector = createSelector(
    state => state.customer,
    memoizedCustomer => memoizedCustomer.id,
)

/* get the user orders  */
export const ordersSelector = createSelector(
    state => state.customer.orders,
    memoizedOrders => values(memoizedOrders).map(val => val),
)

/* get the user credid cards  */
export const creditCardsSelector = createSelector(
    state => state.customer.creditCards,
    memoizedCards => memoizedCards,
)

/* get the user domec cards  */
export const eatalCardsSelector = createSelector(
    state => state.customer.eatalyCards,
    memoizedCards => memoizedCards,
)
