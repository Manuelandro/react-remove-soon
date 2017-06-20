import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    haveItBySkuSelector,
    productIdQuoteSelector,
    userQtyBySkuSelector,
    productUpdatingSelector,
} from 'Selectors'
import {
    AddToCartButton,
    QtyWrapper,
    UpdateQtyButton,
    QtyInput,
} from '../styled'
import * as actions from '../actions'

const Buttons = ({
    addToCart,
    updateQty,
    id,
    haveIt,
    productQuoteId,
    userQty,
    stock,
    isUpdating,
}) => (
    <div>
        {!haveIt
            ? <AddToCartButton onClick={() => addToCart({ id, stock, qty: 1 })}>
                  +
              </AddToCartButton>
            : <QtyWrapper>
                <UpdateQtyButton
                  qtyStyle={userQty}
                  onClick={() =>
                          updateQty({
                              productQuoteId,
                              stock,
                              qty: userQty - 1,
                          })}
                >
                      -
                  </UpdateQtyButton>
                <QtyInput
                  updating={
                          isUpdating !== 0 && isUpdating === productQuoteId
                      }
                >
                    {userQty}
                </QtyInput>
                <UpdateQtyButton
                  onClick={() =>
                          updateQty({
                              productQuoteId,
                              stock,
                              qty: userQty + 1,
                          })}
                >
                      +
                  </UpdateQtyButton>
            </QtyWrapper>}
    </div>
)

Buttons.propTypes = {
    id: PropTypes.number.isRequired,
    haveIt: PropTypes.bool.isRequired,
    productQuoteId: PropTypes.number,
    userQty: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    isUpdating: PropTypes.number,
    addToCart: PropTypes.func.isRequired,
    updateQty: PropTypes.func.isRequired,
}

Buttons.defaultProps = {
    id: 0,
    haveIt: false,
    productQuoteId: 0,
    userQty: 0,
    stock: 0,
    isUpdating: 0,
    addToCart: () => {},
    updateQty: () => {},
}

const mapStateToProps = (state, ownProps) => ({
    haveIt: haveItBySkuSelector(state, ownProps),
    productQuoteId: productIdQuoteSelector(state, ownProps),
    userQty: userQtyBySkuSelector(state, ownProps),
    isUpdating: productUpdatingSelector(state),
})

const mapDispatchToProps = {
    addToCart: actions.addToCart,
    updateQty: actions.updateQty,
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
    renderCountProp: 'renderCountProp',
})(Buttons)
