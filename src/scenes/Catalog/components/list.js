import intersection from 'lodash/intersection'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'redux-little-router'
import { compose, withState, withHandlers } from 'recompose'
import { mediaUrl } from 'Config'
import { filtersSelector } from 'Selectors'
import Buttons from './buttons'

import {
    ProductWrapper,
    IngredientsLink,
    ProductVisibility,
    ProductImageWrapper,
    ProductImage,
    ProductFlex,
    ProductDataWrapper,
    ProductManufacturer,
    ProductName,
    PriceWrapper,
    ProductOldPrice,
    ProductPrice,
    Ingr,
} from '../styled'

const renderPrice = (price, final) => {
    if (price === final || final === '') {
        return (
            <PriceWrapper>
                <ProductPrice>{price}</ProductPrice>
            </PriceWrapper>
        )
    }

    return (
        <PriceWrapper>
            <ProductOldPrice>{price}</ProductOldPrice>
            <ProductPrice>{final}</ProductPrice>
        </PriceWrapper>
    )
}

const HoC = compose(
    withState('ingrVisibility', 'updateIngr', false),
    withHandlers({
        toggleIngr: ({ updateIngr }) => () => updateIngr(n => !n),
    }),
)

const List = HoC(({
    id,
    sku,
    archetipo,
    manufacturer_value: manufacturer,
    name,
    price_label,
    final_price_label,
    stock,
    is_in_stock: inStock,
    image,
    ingredients,
    ingrVisibility,
    toggleIngr,
    filters,
}) => {
    const ownFilters = archetipo ? archetipo.split(',') : []
    let hide

    if (filters.length > 0 && intersection(ownFilters, filters).length === 0) {
        hide = true
    }

    if (stock === 0 || !!inStock === false) {
        hide = true
    }

    return (
        <ProductWrapper hide={hide}>
            <IngredientsLink onClick={toggleIngr}>Ingredienti</IngredientsLink>
            <Ingr visible={ingrVisibility}>{ingredients}</Ingr>
            <ProductVisibility visible={!ingrVisibility}>
                <ProductImageWrapper>
                    <Link href={`/catalog/product/view/id/${id}`}>
                        <ProductImage src={`${mediaUrl}${image}`} alt="" />
                    </Link>
                </ProductImageWrapper>
                <ProductDataWrapper>
                    <ProductFlex>
                        <ProductManufacturer>
                            {manufacturer}
                        </ProductManufacturer>
                        <ProductName>
                            {name}
                        </ProductName>
                        {renderPrice(price_label, final_price_label)}
                    </ProductFlex>
                    <Buttons id={id} sku={sku} stock={stock} />
                </ProductDataWrapper>
            </ProductVisibility>
        </ProductWrapper>
    )
})

List.propTypes = {
    id: PropTypes.number.isRequired,
    sku: PropTypes.string.isRequired,
    manufacturer_value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price_label: PropTypes.string.isRequired,
    final_price_label: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    is_in_stock: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired // eslint-disable-line
}

List.defaultProps = {
    id: 0,
    sku: '',
    manufacturer_value: '',
    name: '',
    price_label: '',
    final_price_label: '',
    stock: 1,
    is_in_stock: 1,
    image: '',
    ingredients: '',
    filters: [],
}

const mapStateToProps = ({ catalog }, ownProps) => ({
    ...ownProps,
    filters: filtersSelector(catalog),
})

export default connect(mapStateToProps)(List)
