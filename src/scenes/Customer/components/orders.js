import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ordersSelector } from 'Selectors'
import { Button } from 'Styled'
import {
    OrdersWrapper,
    OrdersTable,
    OrdersHead,
    OrdersTH,
    OrdersTR,
    OrdersTD,
} from '../styled'

const Orders = ({ orders }) => (
    <OrdersWrapper>
        {orders.length === 0
            ? <div>no orders</div>
            : <OrdersTable>
                <OrdersHead>
                    <OrdersTH>Ordine</OrdersTH>
                    <OrdersTH>Data</OrdersTH>
                    <OrdersTH>Stato</OrdersTH>
                    <OrdersTH>Importo</OrdersTH>
                </OrdersHead>
                {orders.map(val => (
                    <OrdersTR key={val}>
                        <OrdersTD>
                            <Button>{val.increment_id}</Button>
                        </OrdersTD>
                        <OrdersTD><span>{val.created_at}</span></OrdersTD>
                        <OrdersTD><span>{val.status}</span></OrdersTD>
                        <OrdersTD>
                            <span>{val.grand_total}</span>
                        </OrdersTD>
                    </OrdersTR>
                  ))}
            </OrdersTable>}
    </OrdersWrapper>
)

Orders.propTypes = {
    orders: PropTypes.array // eslint-disable-line
}

Orders.defaultProps = {
    orders: [],
}

const mapStateToProps = state => ({
    orders: ordersSelector(state),
})

export default connect(mapStateToProps)(Orders)
