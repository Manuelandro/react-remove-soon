import styled from 'styled-components'
import { mediaQry, maxWidth, colorBrown, colorBlue, colorGrey } from 'Config'

export const InfoWrapper = styled.div`
    padding: 30px 5%;
    width: 100%;
    @media (min-width: ${mediaQry}px) {
        max-width: 300px;
        margin: 0 auto;
        padding: 30px 0;
    }
`

export const LogoutWrapper = styled.div`
    position: absolute;
    top: 65px;
    right: 3%;
`

export const ButtonLogout = styled.button`
    color: #e20505;
    font-size: 11px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-weight: 700;
`

export const Field = styled.div`
    width: 100%;
    margin-bottom: 10px;
`

export const Label = styled.span`
    font-size: 13px;
    font-weight: 600;
    @media (min-width: ${mediaQry}px) {
        font-weight: 300;
        color: ${colorBlue};
        font-size: 14px;
    }
`

export const Value = styled.span`
    font-size: 13px;
    color: #666;
    margin-left: 5px;
    float: right;
    @media (min-width: ${mediaQry}px) {
        float: none;
        color: ${colorBrown};
        font-size: 14px;
    }
`

export const PasswordWrapper = styled.div`
    padding: 30px 5%;
`

export const DeskWrapper = styled.div`
    width: 100%;
    max-width: ${maxWidth}px;
    margin: 0 auto;
    position: relative;
`

export const DeskLinkWrapper = styled.div`
    text-align: center;
`

export const DeskSectionLink = styled.p`
    display: inline-block;
    margin: 0 20px;
    font-size: 15px;
    text-transform: uppercase;
    border-top: 1px solid;
    border-bottom: 1px solid;
    padding: 8px 5px;
    cursor: pointer;
    border-color: ${props => (props.active ? colorBrown : 'transparent')};
    font-family: ${props => (props.active ? 'MuseoSans-700' : 'MuseoSans-300')};
`

export const DeskSectionWrapper = styled.div`
    width: 100%;
    @media (min-width: ${mediaQry}px) {
        min-height: 80vh;
    }

`

export const DeskSection = styled.div`
    width: 100%;
    opacity: 0;
    transform: translate3d(0,0,0);
    background: #f1f1f1;
    position: absolute;
    top: 100px;
    left: 0;
`

export const MobileWrapper = styled.div`
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
`

export const MobileSectionLink = styled.p`
    display: block;
    width: 100%;
    padding: 10px 5%;
    background: #fff;
`

export const MobileSection = styled.div`
    width: 100%;
    transform: translate3d(100%,0,0);
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background: #f1f1f1;
`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ORDERS VIEW
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const OrdersWrapper = styled.div`
    padding: 30px 5%;
`

export const OrdersTable = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const OrdersHead = styled.div`
    width: 100%;
    background: ${colorGrey};
    display: flex;
    justify-content: space-between;
`

export const OrdersTH = styled.div`
    flex: 1;
    height: 48px;
`

export const OrdersTR = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const OrdersTD = styled.div`
    flex: 1;
    height: 48px;
`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * PAYMENTS
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const PaymentWrapper = styled.div`
    width: 100%;
    text-align: center;
`

export const Empty = styled.p`
    width: 100%;
`
