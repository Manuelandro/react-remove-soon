import styled from 'styled-components'
import { mediaQry, skinUrl, colorOrange } from 'Config'

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * FILTER STYLES
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const FiltersWrapper = styled.div`
    text-align: center;
    margin-bottom: 30px;
`

export const Filter = styled.div`
    background: ${props => (props.active ? '#673a35' : '#fff')};
    color: ${props => (!props.active ? '#673a35' : '#fff')};
    display: inline-block;
    margin: 0 12px;
    width: 68px;
    border-radius: 100%;
    height: 68px;
    line-height: 160px;
    text-align: center;
    cursor: pointer;
`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * BUTTON STYLES
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const AddToCartButton = styled.button`
    width: 100%;
    background: #fdb000;
    text-align: center;
    padding: 4px 5px 5px;
    border: 0;
    color: #fff;
    font-size: 28px;
    border-radius: 3px;
    @media (min-width: ${mediaQry}px) {
        width: 63px;
        height: 63px;
    }
`

export const QtyWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

export const QtyInput = styled.div`
    width: 28%;
    display: inline-block;
    text-align: center;
    padding: 6px 5px 5px;
    background: #fff;
    line-height: 50px;
    font-size: ${props => (props.updating ? '0' : '28px')};
    background-image: ${props => (props.updating ? `url(${skinUrl}/images/oval.brown.svg)` : '')};
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 60%;
    @media (min-width: ${mediaQry}px) {
        width: 55px;
        height: 63px;
    }
`

export const UpdateQtyButton = styled.button`
    width: 35%;
    background: ${props => (props.qtyStyle === 1 ? '#d1cbbd' : '#fdb000')};
    text-align: center;
    padding: 4px 5px 5px;
    border: 0;
    color: #fff;
    font-size: 28px;
    border-radius: 3px;
    @media (min-width: ${mediaQry}px) {
        width: 63px;
        height: 63px;
    }
`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * PRODUCT STYLES
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const CatalogWrapper = styled.div`
    overflow: hidden;
    padding-bottom: 50px;
`

export const ProductWrapper = styled.div`
    display: ${props => (props.hide ? 'none' : 'block')};
    padding: 10px;
    clear: both;
    overflow: hidden;
    background: #fff;
    margin: 0px auto 25px;
    width: 93%;
    @media (min-width: ${mediaQry}px) {
        width: 48.5%;
        min-height: 440px;
        margin: 0 auto 30px;
        clear: none;
        &:nth-child(odd) {
            float: left;
        }
        &:nth-child(even) {
            float: right;
        }
    }
`

export const ProductVisibility = styled.div`
    width: 100%;
    display: ${props => (props.visible ? 'block' : 'none')};
`

export const IngredientsLink = styled.p`
    text-align: left;
    color: #fdaf00;
    position: relative;
    cursor: pointer;
    font-size: 15px;
    text-transform: uppercase;
    &:after {
        content: '>';
        display: inline-block;
        margin-left: 5px;
    }
`

export const Ingr = styled.div`
    width: 100%;
    display: ${props => (props.visible ? 'block' : 'none')};
`

export const ProductWrapperDetail = styled(ProductWrapper)`
    padding: 10px;
    clear: both;
    background: #fff;
    margin: 0px auto 25px;
    box-shadow: 0px 11px 34px -5px #d4d4d4;
    width: 93%;
    border-radius: 5px;
`

export const ProductImageWrapper = styled.div`
    float: left;
    width: 50%;
    @media (min-width: ${mediaQry}px) {
        width: 100%;
        float: none;
    }
`
export const ProductImageWrapperDetail = styled(ProductImageWrapper)`
    float: none;
    width: 100%;
`

export const ProductImage = styled.img`
    width: 100px;
    @media (min-width: ${mediaQry}px) {
        width: 100%;
    }
`

export const ProductDataWrapper = styled.div`
    float: right;
    width: 50%;
    @media (min-width: ${mediaQry}px) {
        width: 100%;
        float: none;
        display: flex;
        height: 80px;
        align-items: flex-end;
    }
`
export const ProductFlex = styled.div`
    @media (min-width: ${mediaQry}px) {
        flex: 1;
    }
`

export const ProductManufacturer = styled.div`
    text-align: left;
    color: ${colorOrange};
    font-size: 14px;
    margin-bottom: 5px;
`

export const ProductName = styled.div`
    text-align: left;
    font-size: 16px;
    margin-bottom: 10px;
`

export const PriceWrapper = styled.div`
    display: flex;
`

export const ProductPrice = styled.div`
    text-align: left;
    font-size: 22px;
    margin-bottom: 5px;
`

export const ProductOldPrice = styled.div`
    text-align: left;
    font-size: 22px;
    margin-bottom: 5px;
    margin-right: 20px;
    position: relative;
    &:after {
        content: '';
        width: 100%;
        height: 2px;
        background: #cc0000;
        position: absolute;
        z-index: 2;
        left: 0;
        top: 12px;
    }
`

export const ProductDataWrapperDetail = styled(ProductDataWrapper)`
    float: none;
    width: 100%;
`
