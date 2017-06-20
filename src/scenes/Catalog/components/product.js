import React from 'react'
import PropTypes from 'prop-types'
import { mediaUrl } from 'Config'
import Buttons from './buttons'

import {
    ProductWrapperDetail,
    ProductImageWrapperDetail,
    ProductDataWrapperDetail,
} from '../styled'

const Product = ({ product }) => (
    <div>
        <ProductWrapperDetail>
            <ProductImageWrapperDetail>
                <img src={`${mediaUrl}${product.image}`} width="200px" alt="" />
            </ProductImageWrapperDetail>
            <ProductDataWrapperDetail>
                <h4>{name}</h4>
                <p>Product base price: {product.price}</p>
                <Buttons id={product.id} sku={product.sku} />
            </ProductDataWrapperDetail>
        </ProductWrapperDetail>
        <p>Description: </p>
        <p>bla bla</p>
    </div>
)

Product.propTypes = {
    product: PropTypes.object.isRequired //eslint-disable-line
}

Product.defaultProps = {
    product: {},
}

export default Product
