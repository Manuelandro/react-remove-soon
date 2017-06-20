import React, { Component } from 'react'
import Hammer from 'react-hammerjs'
import { Motion } from 'react-motion'
import { animatePane } from 'Styled'
import Personal from './personal.information'
import Payments from './payments'
import EditPassword from './edit.password'
import Orders from './orders'
import { MobileWrapper, MobileSectionLink, MobileSection } from '../styled'

class MobileDash extends Component {
    constructor(props) {
        super(props)
        this.handleTap = this.handleTap.bind(this)
    }

    state = {
        account: false,
        orders: false,
        payments: false,
    }

    handleTap(section) {
        this.setState({ [section]: !this.state[section] })
    }

    renderMotionSection(name) {
        const stl = animatePane(this.state[name])

        return Comp => (
            <Motion style={stl}>
                {({ X }) => (
                    <MobileSection
                      style={{
                          transform: `translate3d(${X}%,0,0)`,
                      }}
                    >
                        <Hammer onTap={() => this.handleTap(name)}>
                            <p>Indietro</p>
                        </Hammer>
                        <Comp />
                    </MobileSection>
                )}
            </Motion>
        )
    }

    render() {
        return (
            <MobileWrapper>
                <ul>
                    <li>
                        <Hammer onTap={() => this.handleTap('account')}>
                            <MobileSectionLink>
                                Informazioni Account
                            </MobileSectionLink>
                        </Hammer>
                        {this.renderMotionSection('account')(Personal)}
                    </li>
                    <li>
                        <Hammer onTap={() => this.handleTap('orders')}>
                            <MobileSectionLink>I miei ordini</MobileSectionLink>
                        </Hammer>
                        {this.renderMotionSection('orders')(Orders)}
                    </li>
                    <li>
                        <Hammer onTap={() => this.handleTap('payments')}>
                            <MobileSectionLink>
                                Metodi di pagamento
                            </MobileSectionLink>
                        </Hammer>
                        {this.renderMotionSection('payments')(Payments)}
                    </li>
                </ul>
            </MobileWrapper>
        )
    }
}

export default MobileDash
