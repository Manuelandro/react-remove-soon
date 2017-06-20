import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Motion } from 'react-motion'
import { animateForm, InputTextAbsolute, ButtonAbsolute } from 'Styled'
import * as actions from '../actions'
import {
    FormContainer,
    Checkbox,
    ErrorMsg,
    ErrorMsgCheckbox,
    GeneralErrorMessage,
} from '../styled'

const renderError = (validation, top, isOpen) => (
    <ErrorMsg style={{ top }} isopen={isOpen} passed={validation.passed}>
        {validation.error}
    </ErrorMsg>
)

const hoc = compose(
    withState('isOpen', 'toggleIsOpen', false),
    withHandlers({
        toggle: ({ toggleIsOpen }) => () => toggleIsOpen(n => !n),
    }),
)

const Register = hoc(({
    fields,
    form,
    errormessage,
    inputChange,
    registerStart,
    forgotpasswordvisible,
    toggle,
    isOpen,
}) => {
    const { register } = animateForm(isOpen)
    return (
        <FormContainer>
            {!forgotpasswordvisible &&
                <div>
                    <Motion style={register.firstname}>
                        {({ top }) => (
                            <div>
                                <InputTextAbsolute
                                  type="text"
                                  name="firstname"
                                  placeholder="Nome"
                                  style={{ top }}
                                  value={fields.firstname}
                                  autoComplete="off"
                                  onChange={(e) => {
                                      inputChange({
                                          step: 'register',
                                          field: 'firstname',
                                          value: e.target.value,
                                      })
                                  }}
                                  pass={form.firstname.passed}
                                />
                                {renderError(form.firstname, top, isOpen)}
                            </div>
                        )}
                    </Motion>

                    <Motion style={register.lastname}>
                        {({ top }) => (
                            <div>
                                <InputTextAbsolute
                                  type="text"
                                  name="lastname"
                                  placeholder="Cognome"
                                  style={{ top }}
                                  value={fields.lastname}
                                  autoComplete="off"
                                  onChange={(e) => {
                                      inputChange({
                                          step: 'register',
                                          field: 'lastname',
                                          value: e.target.value,
                                      })
                                  }}
                                  pass={form.lastname.passed}
                                />
                                {renderError(form.lastname, top, isOpen)}
                            </div>
                        )}
                    </Motion>

                    <Motion style={register.customer_telephone}>
                        {({ top }) => (
                            <div>
                                <InputTextAbsolute
                                  type="text"
                                  name="customer_telephone"
                                  placeholder="Telefono"
                                  style={{ top }}
                                  value={fields.customer_telephone}
                                  autoComplete="off"
                                  onChange={(e) => {
                                      inputChange({
                                          step: 'register',
                                          field: 'customer_telephone',
                                          value: e.target.value,
                                      })
                                  }}
                                  pass={form.customer_telephone.passed}
                                />
                                {renderError(
                                    form.customer_telephone,
                                    top,
                                    isOpen,
                                )}
                            </div>
                        )}
                    </Motion>

                    <Motion style={register.email}>
                        {({ top }) => (
                            <div>
                                <InputTextAbsolute
                                  type="text"
                                  name="email"
                                  placeholder="Email"
                                  style={{ top }}
                                  value={fields.email}
                                  autoComplete="off"
                                  onChange={(e) => {
                                      inputChange({
                                          step: 'register',
                                          field: 'email',
                                          value: e.target.value,
                                      })
                                  }}
                                  pass={form.email.passed}
                                />
                                {renderError(form.email, top, isOpen)}
                            </div>
                        )}
                    </Motion>
                    <Motion style={register.pass}>
                        {({ top, zIndex }) => (
                            <div>
                                <InputTextAbsolute
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  style={{ top, zIndex }}
                                  value={fields.password}
                                  autoComplete="off"
                                  onChange={(e) => {
                                      +inputChange({
                                          step: 'register',
                                          field: 'password',
                                          value: e.target.value,
                                      })
                                  }}
                                  pass={form.password.passed}
                                />
                                {renderError(form.password, top, isOpen)}
                            </div>
                        )}
                    </Motion>
                    <Motion style={register.privacy}>
                        {({ top }) => (
                            <div>
                                <Checkbox
                                  type="checkbox"
                                  name="privacy"
                                  placeholder="Password"
                                  style={{ top }}
                                  defaultChecked={form.privacy.passed}
                                  value={fields.privacy}
                                  autoComplete="off"
                                  onChange={(e) => {
                                      inputChange({
                                          step: 'register',
                                          field: 'privacy',
                                          value: e.target.checked,
                                      })
                                  }}
                                  pass={form.privacy.passed}
                                />
                                {renderError(form.privacy, top, isOpen)}

                            </div>
                        )}
                    </Motion>
                    <Motion style={register.toggleButton}>
                        {({ top, zIndex }) => (
                            <ButtonAbsolute
                              onClick={toggle}
                              style={{ top, zIndex }}
                            >
                                {isOpen ? 'Annulla' : 'Registrati'}
                            </ButtonAbsolute>
                        )}
                    </Motion>
                    <Motion style={register.button}>
                        {({ top, zIndex }) => (
                            <ButtonAbsolute
                              onClick={() => registerStart()}
                              style={{ top, zIndex }}
                            >
                                Invia
                            </ButtonAbsolute>
                        )}
                    </Motion>
                    <GeneralErrorMessage isopen={isOpen}>
                        {errormessage}
                    </GeneralErrorMessage>
                </div>}
        </FormContainer>
    )
})

Register.defaultProps = {
    fields: {},
    form: {},
    errormessage: '',
    forgotpasswordvisible: false,
    inputChange: () => {},
    registerStart: () => {},
}

Register.propTypes = {
    fields: PropTypes.object, // eslint-disable-line
    inputChange: PropTypes.func.isRequired,
    form: PropTypes.object, // eslint-disable-line
    forgotpasswordvisible: PropTypes.bool,
    errormessage: PropTypes.string,
    registerStart: PropTypes.func,
}

const mapStateToProps = ({ app, home }, ownProps) => ({
    ...ownProps,
    errormessage: app.ux['error'],
    form: home.register['form'],
    forgotpasswordvisible: home.forgotpassword['visible'],
    fields: {
        firstname: home.register['firstname'],
        lastname: home.register['lastname'],
        customer_telephone: home.register['customer_telephone'],
        email: home.register['email'],
        password: home.register['password'],
        privacy: home.register['privacy'],
    },
})

const mapDispatchToProps = {
    inputChange: actions.inputChange,
    registerStart: actions.registerStart,
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
    renderCountProp: 'renderCountProp',
})(Register)
