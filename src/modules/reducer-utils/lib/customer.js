export const domecAsObject = (obj) => {
    if (!obj) {
        return []
    }

    return obj.eatalycards.map(val => ({
        webSerialNumber: val,
    }))
}

export const updateDomecBalance = (state, payload) =>
    state.eatalyCards.map((item) => {
        const found = payload.filter(
            secondItem => secondItem.webSerialNumber === item.webSerialNumber,
        )

        if (found.length === 0) return item

        return {
            ...item,
            balance: found[0].currentBalance,
        }
    })
