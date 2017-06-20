import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withState, withHandlers } from 'recompose'
import { makeGetUserSelector } from 'Selectors'
import NewCart from './new.cart'
import { MethodsWrapper, Method, MyMethodsWrapper, MyMethod } from '../styled'

const hoc = compose(
    withState('selected', 'handler', {
        domec: false,
        credit: false,
        paypal: false,
    }),
    withHandlers({
        toggleOpen: method => ({ handler }) => () => {
            handler(n => ({ ...n, [method]: !n[method] }))
        },
    }),
)

const NewMethods = ({ toggleOpen, selected }) => (
    <MethodsWrapper>
        <Method active={selected.domec} onClick={() => toggleOpen('domec')}>
            Eataly card
        </Method>
        <Method active={selected.credit} onClick={() => toggleOpen('credit')}>
            Carta di credito
        </Method>
        <Method active={selected.paypal} onClick={() => toggleOpen('paypal')}>
            PayPal
        </Method>
        <NewCart />
    </MethodsWrapper>
)

const SavedMethods = ({ domec, credit }) => (
    <MyMethodsWrapper>
        {domec.map(val => (
            <MyMethod type="domec">
                <p>EATALY CARD</p>
                <p>{val.webSerialNumber}</p>
                <p>Saldo: </p>
            </MyMethod>
        ))}
        {credit.map(val => (
            <MyMethod type="credit">{val.agreement_label}</MyMethod>
        ))}
    </MyMethodsWrapper>
)

const Payment = hoc(({ credit, domec, toggleOpen, selected }) => (
    <div>
        METODI DI PAGAMENTO
        {!credit.length && !domec.length
            ? <NewMethods toggleOpen={toggleOpen} selected={selected} />
            : <SavedMethods domec={domec} credit={credit} />}
    </div>
))

Payment.defaultProps = {
    credit: [],
    domec: [],
    toggleOpen: () => {},
    selected: {},
}

Payment.propTypes = {
    credit: PropTypes.array.isRequired,
    domec: PropTypes.array.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    selected: PropTypes.object.isRequired,
}

// reselect - sharing-selectors-with-props-across-multiple-components
const makeMapStateToProps = () => {
    const getCartSelector = makeGetUserSelector()
    const mapStateToProps = state => ({
        credit: getCartSelector(state).creditCards,
        domec: getCartSelector(state).eatalyCards,
    })

    return mapStateToProps
}

export default connect(makeMapStateToProps)(Payment)
