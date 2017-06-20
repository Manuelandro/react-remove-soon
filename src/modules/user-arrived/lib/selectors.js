export const getLogged = ({ customer }) => ({
    lastLogged: customer.lastLogged,
    userLogged: customer.userLogged,
})

export const getCustomer = ({ customer }) => ({
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
})
