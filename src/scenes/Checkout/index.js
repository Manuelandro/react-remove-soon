import React from 'react'
import { connect } from 'react-redux'
import { MaxWrapper, WelcomeMsg, WelcomeMsgH, Button } from 'Styled'
import { CheckoutWrapper } from './styled'
import Items from './components/items'
import Coupon from './components/coupon'
import Shipping from './components/shipping'
import Payment from './components/payment'
import * as actions from './actions'

const Checkout = ({ placeOrder }) => (
    <MaxWrapper>
        <WelcomeMsg>
            <WelcomeMsgH>RIEPILOGO ORDINE</WelcomeMsgH>
        </WelcomeMsg>
        <CheckoutWrapper>
            <Items />
            <Coupon />
            <Shipping />
            <Payment />
            <Button onClick={() => placeOrder()}>Place Order</Button>
        </CheckoutWrapper>
    </MaxWrapper>
)

const mapDispatchToProps = {
    placeOrder: actions.placeOrder,
}

export default connect(null, mapDispatchToProps)(Checkout)
