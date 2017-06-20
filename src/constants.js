export const USER_ARRIVED = 'USER_ARRIVED'
export const APP_LOADED = 'APP_LOADED'
export const GET_LOGGED_ERROR = 'GET_LOGGED_ERROR'
export const NOT_LOGGED = 'NOT_LOGGED'
export const SET_LOGGED = 'SET_LOGGED'
export const ALREADY_LOGGED = 'ALREADY_LOGGED'
export const ROUTER_PUSH = 'ROUTER_PUSH'
export const ROUTER_LOCATION_CHANGED = 'ROUTER_LOCATION_CHANGED'

export const INPUT_CHANGE = 'INPUT_CHANGE'
export const VALIDATION_PASSED = 'VALIDATION_PASSED'
export const VALIDATION_FAILED = 'VALIDATION_FAILED'
export const SET_FORM_KEY = 'SET_FORM_KEY'

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
/*
* LOGIN
*/
export const LOGIN_START = '@@LOGIN/START'
export const LOGIN_START_FAILED = '@@LOGIN/START_FAILED'
export const LOGIN_GET_FORM_KEY = '@@LOGIN/GET_FORM_KEY'
export const LOGIN_GET_FORM_KEY_ERROR = '@@LOGIN/GET_FORM_KEY_ERROR'
export const GET_LOGIN_FORM = '@@LOGIN/GET_FORM'
export const GET_LOGIN_FORM_ERROR = '@@LOGIN/GET_FORM_ERROR'
export const LOGIN_REQUEST = '@@LOGIN/REQUEST'
export const LOGIN_SUCCESS = '@@LOGIN/SUCCESS'
export const LOGIN_FAILED = '@@LOGIN/FAILED'
export const LOGIN_COMPLETED = '@@LOGIN/COMPLETED'

/*
* LOGOUT
*/
export const LOGOUT_START = '@@LOGOUT/START'
export const LOGOUT_START_FAILED = '@@LOGOUT/START_FAILED'
export const LOGOUT_REQUEST = '@@LOGOUT/REQUEST'
export const LOGOUT_SUCCESS = '@@LOGOUT/SUCCESS'
export const LOGOUT_FAILED = '@@LOGOUT/FAILED'
export const LOGOUT_END = '@@LOGOUT/END'

/*
* REGISTER
*/
export const REGISTER_START = '@@REGISTER/START'
export const REGISTER_START_FAILED = '@@REGISTER/START_FAILED'
export const REGISTER_GET_FORM_KEY = '@@REGISTER/GET_FORM_KEY'
export const REGISTER_GET_FORM_KEY_ERROR = '@@REGISTERGET_FORM_KEY_ERROR'
export const GET_REGISTER_FORM = '@@REGISTER/GET_FORM'
export const GET_REGISTER_FORM_ERROR = '@@REGISTER/GET_FORM_ERROR'
export const REGISTER_REQUEST = '@@REGISTER/REQUEST'
export const REGISTER_SUCCESS = '@@REGISTER/SUCCESS'
export const REGISTER_FAILED = '@@REGISTER/FAILED'
export const REGISTER_COMPLETED = '@@REGISTER/COMPLETED'

/*
* FORGOT PASSWORD
*/

export const FORGOT_PASSWORD_START = '@@FORGOTPASSWORD/START'
export const FORGOT_PASSWORD_START_FAILED = '@@FORGOTPASSWORD/START_FAILED'
export const FORGOT_PASSWORD_GET_FORM_KEY_ERROR =
    '@@FORGOTPASSWORD/GET_FORM_KEY_ERROR'
export const FORGOT_PASSWORD_GET_FORM_KEY = '@@FORGOTPASSWORD/GET_FORM_KEY'
export const GET_FORGOT_PASSWORD_FORM =
    '@@FORGOTPASSWORD/GET_FORGOT_PASSWORD_FORM'
export const GET_FORGOT_PASSWORD_FORM_ERROR =
    '@@FORGOTPASSWORD/GET_FORGOT_PASSWORD_FORM_ERROR'
export const FORGOT_PASSWORD_FAILED = '@@FORGOTPASSWORD/FORGOT_PASSWORD_FAILED'
export const FORGOT_PASSWORD_REQUEST = '@@FORGOTPASSWORD/REQUEST'

/*
* CATALOG
*/
export const PULL_CATALOG = 'PULL_CATALOG'
export const GET_CATALOG_FETCHED = 'GET_CATALOG_FETCHED'
export const GET_CATALOG_FETCHED_ERROR = 'GET_CATALOG_FETCHED_ERROR'
export const CATALOG_ALREADY_FETCHED = 'CATALOG_ALREADY_FETCHED'
export const PULL_CATALOG_REQUEST = 'PULL_CATALOG_REQUEST'
export const PULL_CATALOG_COMPLETE = 'PULL_CATALOG_COMPLETE'
export const PULL_CATALOG_ERROR = 'PULL_CATALOG_ERROR'
export const SAVE_CATALOG = 'SAVE_CATALOG'
export const SAVE_CATALOG_COMPLETE = 'SAVE_CATALOG_COMPLETE'
export const SAVE_CATALOG_ERROR = 'SAVE_CATALOG'
export const PULL_CATALOG_END = 'PULL_CATALOG_END'

export const FETCH_PRICES = 'FETCH_PRICES'
export const FETCH_PRICES_REQUEST = 'FETCH_PRICES_REQUEST'
export const FETCH_PRICES_COMPLETE = 'FETCH_PRICES_COMPLETE'
export const FETCH_PRICES_ERROR = 'FETCH_PRICES_ERROR'
export const SAVE_PRICES = 'SAVE_PRICES'
export const FETCH_PRICES_END = 'FETCH_PRICES_END'

export const FETCH_STOCK = 'FETCH_STOCK'
export const FETCH_STOCK_REQUEST = 'FETCH_STOCK_REQUEST'
export const FETCH_STOCK_COMPLETE = 'FETCH_STOCK_COMPLETE'
export const FETCH_STOCK_ERROR = 'FETCH_STOCK_ERROR'
export const SAVE_STOCK = 'SAVE_STOCK'
export const FETCH_STOCK_END = 'FETCH_STOCK_END'

export const TOGGLE_FILTER = 'TOGGLE_FILTER'

/*
* CART
*/
export const CART_QUOTE_SAVE = '++CART/QUOTE/SAVE'

export const CART_ADD_START = '++CART/ADD/START'
export const CART_ADD_START_FAILED = '++CART/ADD/START_FAILED'
export const CART_ADD_REQUEST = '++CART/ADD/REQUEST'
export const CART_ADD_SUCCESS = '++CART/ADD/SUCCESS'
export const CART_ADD_FAILED = '++CART/ADD/FAILED'
export const CART_ADD_OUT_OF_STOCK = '++CART/ADD/OUT_OF_STOCK'

export const CART_UPDATE_START = '+-CART/UPDATE/START'
export const CART_UPDATE_START_FAILED = '+-CART/UPDATE/START_FAILED'
export const CART_UPDATE_REQUEST = '+-CART/UPDATE/REQUEST'
export const CART_UPDATE_SUCCESS = '+-CART/UPDATE/SUCCESS'
export const CART_UPDATE_FAILED = '+-CART/UPDATE/FAILED'
export const CART_UPDATE_OUT_OF_STOCK = '+-CART/UPDATE/OUT_OF_STOCK'
export const CART_UPDATE_END = '+-CART/UPDATE/END'

export const CART_DELETE_START = '++CART/DELETE/START'
export const CART_DELETE_START_FAILED = '++CART/DELETE/START_FAILED'
export const CART_DELETE_REQUEST = '++CART/DELETE/REQUEST'
export const CART_DELETE_SUCCESS = '++CART/DELETE/SUCCESS'
export const CART_DELETE_FAILED = '++CART/DELETE/FAILED'

/*
* CHECKOUT
*/
export const COUPON_TOGGLE = 'COUPON_TOGGLE'
export const COUPON_TOGGLE_ERROR = 'COUPON_TOGGLE_ERROR'
export const COUPON_TOGGLE_REQUEST = 'COUPON_TOGGLE_REQUEST'
export const COUPON_TOGGLE_SUCCESS = 'COUPON_TOGGLE_SUCCESS'
export const COUPON_TOGGLE_END = 'COUPON_TOGGLE_END'

export const CHECKOUT_START = '++CHECKOUT/START'
export const CHECKOUT_START_FAILED = '++CHECKOUT/START'
export const CHECKOUT_SEND_SHIPPING = '++CHECKOUT/SEND_SHIPPING'
export const CHECKOUT_SEND_SHIPPING_FAILED = '++CHECKOUT/SEND_SHIPPING_FAILED'
export const CHECKOUT_SEND_PAYMENT = '++CHECKOUT/SEND_PAYMENT'
export const CHECKOUT_SEND_PAYMENT_FAILED = '++CHECKOUT/SEND_PAYMENT_FAILED'

/*
* CUSTOMER
*/
export const CUSTOMER_FETCH_ALL = 'CUSTOMER_FETCH_ALL'
export const CUSTOMER_FETCH_ALL_ERROR = 'CUSTOMER_FETCH_ALL'
export const CUSTOMER_FETCH_ALL_COMPLETE = 'CUSTOMER_FETCH_ALL_COMPLETE'
export const CUSTOMER_DATA_FETCH = 'CUSTOMER_DATA_FETCH'
export const CUSTOMER_DATA_SAVE = 'CUSTOMER_DATA_SAVE'
export const CUSTOMER_DATA_FETCH_COMPLETED = 'CUSTOMER_DATA_FETCH_COMPLETED'
export const CUSTOMER_DATA_FETCH_ERROR = 'CUSTOMER_DATA_FETCH_ERROR'

export const CUSTOMER_ORDERS_FETCH = 'CUSTOMER_ORDERS_FETCH'
export const CUSTOMER_ORDERS_SAVE = 'CUSTOMER_ORDERS_SAVE'
export const CUSTOMER_ORDERS_FETCH_COMPLETED = 'CUSTOMER_ORDERS_FETCH_COMPLETED'
export const CUSTOMER_ORDERS_FETCH_ERROR = 'CUSTOMER_ORDERS_FETCH_ERROR'

export const CUSTOMER_PAYMENT_FETCH = 'CUSTOMER_PAYMENT_FETCH'
export const CUSTOMER_PAYMENT_SAVE = 'CUSTOMER_PAYMENT_SAVE'
export const CUSTOMER_PAYMENT_FETCH_COMPLETED =
    'CUSTOMER_PAYMENT_FETCH_COMPLETED'
export const CUSTOMER_PAYMENT_FETCH_ERROR = 'CUSTOMER_PAYMENT_FETCH_ERROR'

export const FETCH_DOMEC_BALANCE = 'FETCH_DOMEC_BALANCE'
export const FETCH_DOMEC_BALANCE_REQUEST = 'FETCH_DOMEC_BALANCE_REQUEST'
export const FETCH_DOMEC_BALANCE_SUCCESS = 'FETCH_DOMEC_BALANCE_SUCCESS'
export const FETCH_DOMEC_BALANCE_ERROR = 'FETCH_DOMEC_BALANCE_ERROR'
export const FETCH_DOMEC_BALANCE_END = 'FETCH_DOMEC_BALANCE_END'

export const EDIT_PASSWORD_START = 'EDIT_PASSWORD_START'
export const EDIT_PASSWORD_ERROR = 'EDIT_PASSWORD_ERROR'
export const FETCH_PASSWORD_FORM_ERROR = 'FETCH_PASSWORD_FORM_ERROR'
export const EDIT_PASSWORD_FORM_KEY = 'EDIT_PASSWORD_FORM_KEY'
export const EDIT_PASSWORD_FORM_KEY_ERROR = 'EDIT_PASSWORD_FORM_KEY_ERROR'
export const EDIT_PASSWORD_REQUEST = 'EDIT_PASSWORD_REQUEST'
export const EDIT_PASSWORD_REQUEST_FAILED = 'EDIT_PASSWORD_REQUEST_FAILED'
export const EDIT_PASSWORD_FAILED = 'EDIT_PASSWORD_FAILED'
export const EDIT_PASSWORD_SUCCESS = 'EDIT_PASSWORD_SUCCESS'

/*
* PAYMENT METHODS
*/
export const SAVE_CREDIT_CARD = 'SAVE_CREDIT_CARD'
export const SAVE_DOMEC_CARD = 'SAVE_DOMEC_CARD'
export const SAVE_DOMEC_CARD_INVALID = 'SAVE_DOMEC_CARD_INVALID'
export const SAVE_DOMEC_GET_CUSTOMER = 'SAVE_DOMEC_GET_CUSTOMER'
export const SAVE_DOMEC_GET_CUSTOMER_FAILED = 'SAVE_DOMEC_GET_CUSTOMER_FAILED'
export const SAVE_DOMEC_REQUEST = 'SAVE_DOMEC_REQUEST'
export const SAVE_DOMEC_REQUEST_FAILED = 'SAVE_DOMEC_REQUEST_FAILED'
export const SAVE_DOMEC_SUCCESS = 'SAVE_DOMEC_SUCCESS'
export const SAVE_DOMEC_CARD_END = 'SAVE_DOMEC_CARD_END'
export const SAVE_PAYPAL_ACCOUNT = 'SAVE_PAYPAL_ACCOUNT'