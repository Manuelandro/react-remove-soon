export default function makeEndPoint(url) {
    return {
        keyUrl: `${url}/form/key`, // GET
        loggedUrl: `${url}/auth/getlogged`, // GET
        catalogUrl: `${url}/catalog/products`, // GET
        pricesUrl: `${url}/rest/default/V1/products/prices`, // GET
        stockUrl: `${url}/inventory/inventory`, // GET
        addUrl: `${url}/eataly_checkout/cart/add`, // POST
        updateUrl: `${url}/eataly_checkout/cart/update`,
        deleteUrl: `${url}/eataly_checkout/cart/delete`,
        userUrl: `${url}/eataly_customer/data/`, // GET
        ordersUrl: `${url}/eataly_customer/data/orders`, // GET
        paymentUrl: `${url}/eataly_checkout/onepage/config`, // GET
        editUrl: `${url}/rest/V1/customers/me/password`, // POST
        couponUrl: `${url}/eataly_checkout/cart/couponpost`, // GET
        shippingUrl: `${url}/rest/default/V1/carts/mine/shipping-information`, // POST
        savedPaymUrl: `${url}/rest/default/V1/carts/mine/payment-information`, // POST
        addDomecUrl: `${url}/domec/customer/domectocustomer`, // GET
        balanceDomecUrl: `${url}/domec/card/balance`, // GET
    }
}
