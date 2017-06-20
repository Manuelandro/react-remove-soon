import keys from 'lodash/keys'
import values from 'lodash/values'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeGetCartSelector } from 'Selectors'
import { ItemsWrapper, Item, ItemName, ItemPrice, SumRowPrice } from '../styled'

const Items = ({ products, grandTotal }) => {
    if (!products || keys(products).length === 0) {
        return null
    }

    return (
        <ItemsWrapper>
            {values(products).map(val => (
                <Item key={val.name}>
                    <ItemName>{val.name}</ItemName>
                    <ItemPrice>{val.rowPrice}</ItemPrice>
                </Item>
            ))}
            <SumRowPrice>Totale: {grandTotal}</SumRowPrice>
        </ItemsWrapper>
    )
}

Items.propTypes = {
    products: PropTypes.object.isRequired // eslint-disable-line
}

Items.defaultProps = {
    products: {},
}

// reselect - sharing-selectors-with-props-across-multiple-components
const makeMapStateToProps = () => {
    const getCartSelector = makeGetCartSelector()
    const mapStateToProps = state => ({
        products: getCartSelector(state).items,
        grandTotal: getCartSelector(state).total,
    })

    return mapStateToProps
}

export default connect(makeMapStateToProps)(Items)
