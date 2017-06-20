import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Motion } from 'react-motion'
import { animateForm, InputTextAbsolute, ButtonAbsolute } from 'Styled'
import * as actions from '../actions'
import {
    FormContainer,
    ErrorMsg,
    ForgotLink,
    GeneralErrorMessage,
} from '../styled'

const renderError = (validation, top, isOpen) => (
    <ErrorMsg style={{ top }} isopen={isOpen} passed={validation.passed}>
        {validation.error}
    </ErrorMsg>
)

const hoc = compose(
    withState('isOpen', 'toggleIsOpen', true),
    withHandlers({
        toggle: ({ toggleIsOpen }) => () => toggleIsOpen(n => !n),
    }),
)
const ForgotPassword = hoc(({
    username,
    inputChange,
    forgotPasswordStart,
    errormessage,
    form,
    forgotPassword,
    forgotpasswordvisible,
    isOpen,
}) => {
    const { email, button, toggleButton } = animateForm(isOpen).forgotPassword

    return (
        <FormContainer>
            {forgotpasswordvisible &&
                <div>
                    <Motion style={email}>
                        {({ top }) => (
                            <div>
                                <InputTextAbsolute
                                  type="text"
                                  name="email"
                                  placeholder="Email"
                                  style={{ top }}
                                  value={username}
                                  autoComplete="off"
                                  onChange={e =>
                                        inputChange({
                                            step: 'forgotpassword',
                                            field: 'email',
                                            value: e.target.value,
                                        })}
                                  pass={form['email'].passed}
                                />
                                {renderError(form['email'], top, isOpen)}
                            </div>
                        )}
                    </Motion>

                    <Motion style={button}>
                        {({ top }) => (
                            <ButtonAbsolute
                              onClick={() => forgotPasswordStart()}
                              style={{ top }}
                            >
                                Invia
                            </ButtonAbsolute>
                        )}
                    </Motion>
                    <Motion style={toggleButton}>
                        {({ top }) => (
                            <ButtonAbsolute
                              onClick={() => {
                                  forgotPassword({
                                      form: 'forgotpassword',
                                      visible: false,
                                  })
                              }}
                              style={{ top }}
                            >
                                Annulla
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

ForgotPassword.defaultProps = {
    username: '',
    form: {},
    forgotpasswordvisible: false,
    forgotPassword: () => {},
    forgotPasswordStart: () => {},
    inputChange: () => {},
}

ForgotPassword.propTypes = {
    username: PropTypes.string,
    forgotpasswordvisible: PropTypes.bool,
    form: PropTypes.object,
    inputChange: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
    forgotPasswordStart: PropTypes.func.isRequired,
}

const mapStateToProps = ({ app, home }, ownProps) => ({
    ...ownProps,
    errormessage: app.ux['error'],
    form: home.forgotpassword['form'],
    username: home.forgotpassword['email'],
    forgotpasswordvisible: home.forgotpassword['visible'],
})

const mapDispatchToProps = {
    forgotPassword: actions.forgotPassword,
    forgotPasswordStart: actions.forgotPasswordStart,
    inputChange: actions.inputChange,
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
    renderCountProp: 'renderCountProp',
})(ForgotPassword)
