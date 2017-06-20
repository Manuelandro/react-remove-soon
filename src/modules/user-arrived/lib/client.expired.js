export default function (customerData, expire) {
    const now = Math.round(+new Date() / 1000)
    const { userLogged, lastLogged } = customerData
    const validTime = now - parseInt(lastLogged, 10) < expire

    return !validTime || !userLogged
}
