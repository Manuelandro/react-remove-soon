import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeGetUserSelector } from 'Selectors'
import { PaymentWrapper, Empty } from '../styled'

const Payment = props => (
    <PaymentWrapper>
        <Empty>Non sono presenti metodi di pagamento</Empty>
    </PaymentWrapper>
)

const makeMapStateToProps = () => {
    const getCartSelector = makeGetUserSelector()
    const mapStateToProps = state => ({
        credit: getCartSelector(state).creditCards,
        domec: getCartSelector(state).eatalyCards,
    })

    return mapStateToProps
}

export default connect(makeMapStateToProps)(Payment)
