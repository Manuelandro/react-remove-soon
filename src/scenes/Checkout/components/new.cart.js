import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { InputText } from 'Styled'

const NewCart = props => (
    <div>
        <InputText type="text" size="20" id="number" />
        <InputText type="text" size="20" id="holderName" />
        <InputText type="text" size="2" id="expiryMonth" />
        <InputText type="text" size="4" id="expiryYear" />
        <InputText type="text" size="4" id="cvc" />
        <InputText
          type="hidden"
          value="[generate this server side]"
          id="generationtime"
        />
    </div>
)

const mapStateToProps = {}

export default connect()(NewCart)
