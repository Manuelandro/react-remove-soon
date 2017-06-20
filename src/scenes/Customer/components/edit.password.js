import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withState, withHandlers } from 'recompose'
import { InputText, Button } from 'Styled'
import * as actions from '../actions'
import { PasswordWrapper } from '../styled'

const hoc = compose(
    withState('values', 'change', {
        currentPassword: '',
        newPassword: '',
        confirm: '',
    }),
    withHandlers({
        edit: ({ change }) => (e) => {
            e.persist()
            const targ = e.target
            return change(val => ({ ...val, [targ.name]: targ.value }))
        },
    }),
)

const EditPassword = hoc(({ savePassword, edit, values }) => (
    <PasswordWrapper>
        <div>
            <InputText
              type="password"
              name="currentPassword"
              placeholder="Current password"
              value={values.currentPassword}
              onChange={edit}
            />
            <InputText
              type="password"
              name="newPassword"
              placeholder="New password"
              value={values.newPassword}
              onChange={edit}
            />
            <InputText
              type="password"
              name="confirm"
              placeholder="New password"
              value={values.confirm}
              onChange={edit}
            />
            <Button onClick={() => savePassword(values)}>
                Save password
            </Button>
        </div>
    </PasswordWrapper>
))

EditPassword.propTypes = {
    edit: PropTypes.func.isRequired,
    savePassword: PropTypes.func.isRequired,
}

EditPassword.defaultProps = {
    edit: () => {},
    savePassword: () => {},
}

const mapDispatchToProps = {
    savePassword: actions.savePassword,
}

export default connect(null, mapDispatchToProps)(EditPassword)
