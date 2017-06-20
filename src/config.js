import makeEndPoint from 'Modules/api-endpoint'

export const archetipo = window._ARCHETIPO_ || {}
export const domains = window._DOMAINS_ || []

export const url = window.location.origin
export const pathname = window.location.pathname
export const skinUrl = window.top.require.baseUrl
export const mediaUrl = `${url}/pub/media/catalog/product/`
export const expire = 3600
export const mediaQry = 1224
export const maxWidth = 1170
export const maxWidthForm = 286
export const colorGrey = '#dadada'
export const colorGreyDark = '#777575'
export const colorBrown = '#673a35'
export const colorOrange = '#fdb000'
export const colorBlue = '#1cbef3'

/* api urls */
const urls = makeEndPoint(url)
export const keyUrl = urls.keyUrl // GET
export const loggedUrl = urls.loggedUrl // GET
export const catalogUrl = urls.catalogUrl // GET
export const pricesUrl = urls.pricesUrl // GET
export const stockUrl = urls.stockUrl // GET
export const addUrl = urls.addUrl // POST
export const updateUrl = urls.updateUrl
export const deleteUrl = urls.deleteUrl
export const userUrl = urls.userUrl // GET
export const ordersUrl = urls.ordersUrl // GET
export const paymentUrl = urls.paymentUrl // GET
export const editUrl = urls.editUrl // POST
export const couponUrl = urls.couponUrl // GET
export const shippingUrl = urls.shippingUrl // POST
export const savedPaymUrl = urls.savedPaymUrl // POST
export const addDomecUrl = urls.addDomecUrl // GET
export const balanceDomecUrl = urls.balanceDomecUrl // GET

export const routeAfterLogin = { pathname: '/catalog' }
