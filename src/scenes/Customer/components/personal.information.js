import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { customerSelector } from 'Selectors'
import EditPassword from './edit.password'
import { InfoWrapper, Field, Label, Value } from '../styled'

const Personal = ({ customer }) => (
    <InfoWrapper>
        <Field><Label>Nome:</Label><Value>{customer.firstname}</Value></Field>
        <Field><Label>Cognome:</Label><Value>{customer.lastname}</Value></Field>
        <Field><Label>Email:</Label><Value>{customer.email}</Value></Field>
        <Field>
            <Label>Telefono:</Label><Value>{customer.customer_telephone}</Value>
        </Field>
        <EditPassword />
    </InfoWrapper>
)

Personal.propTypes = {
    customer: PropTypes.object.isRequired //eslint-disable-line
}

Personal.defaultProps = {
    customer: {},
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    customer: customerSelector(state),
})

export default connect(mapStateToProps)(Personal)
