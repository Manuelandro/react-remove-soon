import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'react-addons-update'
import { connect } from 'react-redux'
import { userNameSelector } from 'Selectors'
import { Motion } from 'react-motion'
import { WelcomeMsg, WelcomeMsgH, WelcomeMsgP, animateOpacity } from 'Styled'
import Personal from './personal.information'
import Payments from './payments'
import Orders from './orders'
import * as actions from '../actions'
import {
    DeskWrapper,
    DeskLinkWrapper,
    DeskSectionLink,
    DeskSectionWrapper,
    DeskSection,
} from '../styled'

class DeskDash extends Component {
    static defaultProps = {
        customerName: '',
        logoutStart: () => {},
    }

    static propTypes = {
        customerName: PropTypes.string.isRequired,
        logoutStart: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.initialState = {
            account: false,
            orders: false,
            payments: false,
        }
    }

    state = { ...this.initialState, account: true }

    handleClick(section) {
        this.setState(
            update(this.initialState, {
                [section]: { $set: true },
            }),
        )
    }

    renderMotionSection(name) {
        const stl = animateOpacity(!this.state[name])

        return Comp => (
            <Motion style={stl}>
                {({ X }) => (
                    <DeskSection
                      style={{
                          opacity: X / 100,
                      }}
                    >
                        <Comp />
                    </DeskSection>
                )}
            </Motion>
        )
    }

    render() {
        const { customerName, logoutStart } = this.props
        return (
            <DeskWrapper>
                <WelcomeMsg>
                    <WelcomeMsgH>Ciao {customerName}</WelcomeMsgH>
                    <WelcomeMsgP>questa è la tua area account</WelcomeMsgP>
                </WelcomeMsg>
                <DeskLinkWrapper>
                    <DeskSectionLink
                      active={this.state.account}
                      onClick={() => this.handleClick('account')}
                    >
                        I miei dati
                    </DeskSectionLink>
                    <DeskSectionLink
                      active={this.state.orders}
                      onClick={() => this.handleClick('orders')}
                    >
                        I miei ordini
                    </DeskSectionLink>
                    <DeskSectionLink
                      active={this.state.payments}
                      onClick={() => this.handleClick('payments')}
                    >
                        Metodi di pagamento
                    </DeskSectionLink>
                    <DeskSectionLink onClick={() => logoutStart()}>
                        Esci
                    </DeskSectionLink>
                </DeskLinkWrapper>
                <DeskSectionWrapper>
                    {this.renderMotionSection('account')(Personal)}
                    {this.renderMotionSection('orders')(Orders)}
                    {this.renderMotionSection('payments')(Payments)}
                </DeskSectionWrapper>
            </DeskWrapper>
        )
    }
}

const mapStateToProps = state => ({
    customerName: userNameSelector(state),
})

const mapDispatchToProps = {
    logoutStart: actions.logoutStart,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeskDash)
