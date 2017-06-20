export const updateStock = (state, payload) =>
    state.products.map((item) => {
        const found = payload.filter(
            secondItem => secondItem.product_id === item.id,
        )

        if (found.length === 0) return item

        return {
            ...item,
            stock: found[0].qty,
            is_in_stock: found[0].is_in_stock,
        }
    })

export const updatePrice = (state, payload) =>
    state.products.map((item) => {
        const found = payload.filter(secondItem => secondItem.id === item.id)

        if (found.length === 0) return item

        return {
            ...item,
            price_label: found[0].price_label,
            final_price_label: found[0].final_price_label,
        }
    })
