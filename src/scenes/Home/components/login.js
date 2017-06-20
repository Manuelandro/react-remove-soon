import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Motion } from 'react-motion'
import { loginFormSelector } from 'Selectors'
import { validateEnter } from 'Modules/form-validation'
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
    withState('isOpen', 'handler', false),
    withHandlers({
        toggleOpen: ({ handler }) => () => {
            handler(n => !n)
        },
    }),
)

const Login = hoc(({
    username,
    password,
    form,
    forgotPassword,
    forgotpasswordvisible,
    toggleOpen,
    inputChange,
    loginStart,
    errormessage,
    isOpen,
}) => {
    const { email, pass, button, toggleButton, forgotButton } = animateForm(
        isOpen,
    ).login

    return (
        <FormContainer>
            {!forgotpasswordvisible &&
                <div>
                    <Motion style={email}>
                        {({ top }) => (
                            <div>
                                <InputTextAbsolute
                                  type="text"
                                  name="login[username]"
                                  placeholder="Email"
                                  style={{ top }}
                                  value={username}
                                  autoComplete="off"
                                  onKeyPress={e =>
                                        validateEnter(e, loginStart)}
                                  onChange={e =>
                                        inputChange({
                                            step: 'login',
                                            field: 'login[username]',
                                            value: e.target.value,
                                        })}
                                  pass={form['login[username]'].passed}
                                />
                                {renderError(
                                    form['login[username]'],
                                    top,
                                    isOpen,
                                )}
                            </div>
                        )}
                    </Motion>
                    <Motion style={pass}>
                        {({ top }) => (
                            <div>
                                <InputTextAbsolute
                                  type="password"
                                  name="login[password]"
                                  placeholder="Password"
                                  style={{ top }}
                                  value={password}
                                  autoComplete="off"
                                  onKeyPress={e =>
                                        validateEnter(e, loginStart)}
                                  onChange={e =>
                                        inputChange({
                                            step: 'login',
                                            field: 'login[password]',
                                            value: e.target.value,
                                        })}
                                  pass={form['login[password]'].passed}
                                />
                                {renderError(
                                    form['login[password]'],
                                    top,
                                    isOpen,
                                )}
                            </div>
                        )}

                    </Motion>
                    <Motion style={button}>
                        {({ top }) => (
                            <ButtonAbsolute
                              onClick={() => loginStart()}
                              style={{ top }}
                            >
                                Invia
                            </ButtonAbsolute>
                        )}
                    </Motion>
                    <Motion style={toggleButton}>
                        {({ top }) => (
                            <ButtonAbsolute
                              onClick={toggleOpen}
                              style={{ top, zIndex: '9' }}
                            >
                                {isOpen ? 'Annulla' : 'Login'}
                            </ButtonAbsolute>
                        )}
                    </Motion>
                    <Motion style={forgotButton}>
                        {({ top }) => (
                            <ForgotLink
                              onClick={() => {
                                  forgotPassword({
                                      form: 'forgotpassword',
                                      visible: true,
                                  })
                              }}
                              style={{ top }}
                            >
                                Hai dimenticato la password? Clicca qui
                            </ForgotLink>
                        )}
                    </Motion>
                    <GeneralErrorMessage isopen={isOpen}>
                        {errormessage}
                    </GeneralErrorMessage>
                </div>}
        </FormContainer>
    )
})

Login.defaultProps = {
    username: '',
    password: '',
    form: {},
    errormessage: '',
    forgotpasswordvisible: false,
    inputChange: () => {},
    loginStart: () => {},
    forgotPassword: () => {},
}

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    form: PropTypes.object, // eslint-disable-line
    forgotpasswordvisible: PropTypes.bool,
    inputChange: PropTypes.func.isRequired,
    loginStart: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    errormessage: state.app.ux['error'],
    username: loginFormSelector(state)['login[username]'],
    password: loginFormSelector(state)['login[password]'],
    form: state.home.login['form'],
    forgotpasswordvisible: state.home.forgotpassword['visible'],
})

const mapDispatchToProps = {
    inputChange: actions.inputChange,
    loginStart: actions.loginStart,
    forgotPassword: actions.forgotPassword,
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
    renderCountProp: 'renderCountProp',
})(Login)
