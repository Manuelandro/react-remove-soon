import indexOf from 'lodash/indexOf'
import update from 'react-addons-update'
import { updateStock, updatePrice } from 'Modules/reducer-utils'
import * as c from 'Consts'
import initialState from './initialState.json'

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case c.SAVE_CATALOG:
            return update(state, {
                fetched: { $set: true },
                products: { $set: payload },
            })
        case c.SAVE_STOCK:
            return update(state, {
                products: { $set: updateStock(state, payload) },
            })
        case c.SAVE_PRICES:
            return update(state, {
                products: { $set: updatePrice(state, payload) },
            })
        case c.TOGGLE_FILTER:
            if (indexOf(state.ux.filters, payload) > -1) {
                const filters = state.ux.filters.filter(val => val !== payload)
                return update(state, {
                    ux: {
                        filters: {
                            $set: filters,
                        },
                    },
                })
            }
            return update(state, {
                ux: {
                    filters: { $push: [payload] },
                },
            })
        case c.CART_UPDATE_START:
            return update(state, {
                ux: {
                    productUpdating: { $set: payload.productQuoteId },
                },
            })
        case c.CART_UPDATE_END:
            return update(state, {
                ux: {
                    productUpdating: { $set: 0 },
                },
            })
        default:
            return state
    }
}
