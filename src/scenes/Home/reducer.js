import update from 'react-addons-update'
import * as c from 'Consts'
import initialState from './initialState.json'

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case c.INPUT_CHANGE:
            return update(state, {
                [payload.step]: {
                    [payload.field]: { $set: payload.value },
                    form: {
                        [payload.field]: {
                            passed: { $set: true },
                            error: { $set: '' },
                        },
                    },
                },
            })
        case c.SET_FORM_KEY:
            return update(state, {
                form_key: { $set: payload },
            })
        case c.LOGIN_SUCCESS:
            return update(state, {
                form_key: { $set: '' },
                login: {
                    'login[username]': { $set: '' },
                    'login[password]': { $set: '' },
                },
            })
        case c.REGISTER_SUCCESS:
            return update(state, {
                $set: initialState,
            })
        case c.VALIDATION_FAILED:
            return update(state, {
                [payload.form]: {
                    form: {
                        $set: payload.data,
                    },
                },
            })
        case c.FORGOT_PASSWORD:
            return update(state, {
                [payload.form]: {
                    visible: { $set: payload.visible },
                },
            })
        default:
            return state
    }
}
