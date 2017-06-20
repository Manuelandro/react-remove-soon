import styled from 'styled-components'
import { Button, InputText } from 'Styled'
import { skinUrl, mediaQry, colorBrown, colorGreyDark } from 'Config'

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * COMMON DIVS
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export const CheckoutWrapper = styled.div`
    width: 100%;
    @media (min-width: ${mediaQry}px) {
        max-width: 420px;
        margin: 0 auto;
    }

`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * CART REVIEW ELEMENTS
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const ItemsWrapper = styled.div`
    width: 100%;
`

export const Item = styled.div`
    width: 100%;
    oveflow: hidden;
`

export const ItemName = styled.p`
    display: block;
    width: 70%;
    float: left;
    text-align: left;
`

export const ItemPrice = styled.p`
    display: block;
    width: 30%;
    float: right;
    text-align: right;
`

export const SumRowPrice = styled.div`
    float: right;
`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * COUPON ELEMENTS
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const CouponWrapper = styled.div`
    width: 100%;
    overflow: hidden;
    padding: 20px 0;
`

export const InputTextCoupon = styled(InputText)`
    background: #fff;
    padding-left: 15px;
    &[disabled] {
        background: #e6e6e6;
        color: #43aacc;
    }
    @media (min-width: ${mediaQry}px) {
        max-width: 250px;
        height: 46px;
        float: left;
    }
`

export const ButtonCoupon = styled(Button)`
    background: #cbcbc5;
    color: ${colorBrown};
    @media (min-width: ${mediaQry}px) {
        max-width: 140px;
        float: right;
    }
`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * PAYMENT METHODS
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

const eatalyCardIcn = `${skinUrl}/images/icns/eatalyCard.png`

export const MethodsWrapper = styled.div`
    width: 100%;
`

export const Method = styled.div`
    width: 100%;
    background: #fff;
    text-align: left;
    padding: 0 0 0 20px;
    font-size: 18px;
    color: ${colorGreyDark};
    @media (min-width: ${mediaQry}px) {
        height: 66px;
        line-height: 66px;
        max-width: 365px;
        margin: 0 auto 15px;
        cursor: pointer;
    }
`

export const MyMethodsWrapper = styled.div`
    width: 100%;
`
export const MyMethod = styled.div`
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: left;
    padding-left: 20%;
    border-radius: 3px;
    background-color: #fff;
    background-image: ${props => (props.type === 'domec' ? `url(${eatalyCardIcn})` : '')};
    background-repeat: no-repeat;
    background-position: 10px 50%;
    background-size: 10%;
`
