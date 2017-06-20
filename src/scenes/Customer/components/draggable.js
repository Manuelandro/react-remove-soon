import isPlainObject from 'lodash/isPlainObject'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Hammer from 'react-hammerjs'
import DraggableCards from 'Modules/draggable-cards'
import { eatalCardsSelector, creditCardsSelector } from 'Selectors'
import { CardContainer, CardRed, CardSectionDraggable } from '../styled'

class Draggable extends Component {
    static propTypes = {
        creditCards: PropTypes.array, // eslint-disable-line
        eatalyCards: PropTypes.array // eslint-disable-line
    }
    static defaultProps = {
        creditCards: [],
        eatalyCards: [],
    }

    constructor(props) {
        super(props)
        this.handlePan = this.handlePan.bind(this)
    }

    state = {
        activeSlide: 0,
        slideCount: 0,
        style: {},
    }

    componentWillMount() {
        const { eatalyCards, creditCards } = this.props

        this.setState({
            slideCount: eatalyCards.length + creditCards.length,
        })
    }

    handlePan(event) {
        const { slideCount, activeSlide } = this.state
        const handle = DraggableCards({ event, slideCount, activeSlide })

        this.setState({
            activeSlide: handle.isFinal ? handle.change.newSlide : activeSlide,
            style: {
                transform: `translate3d(${handle.change.percentual}%, 0, 0)`,
            },
        })
    }

    render() {
        const { eatalyCards, creditCards } = this.props
        const cards = creditCards.concat(eatalyCards)

        return (
            <Hammer onPan={this.handlePan}>
                <CardSectionDraggable style={this.state.style}>
                    {cards.map((val, indx) => {
                        const value = isPlainObject(val)
                            ? val.agreement_label
                            : val

                        return (
                            <CardContainer key={indx}>
                                <CardRed>{value}</CardRed>
                            </CardContainer>
                        )
                    })}
                </CardSectionDraggable>
            </Hammer>
        )
    }
}

const mapStateToProps = state => ({
    eatalyCards: eatalCardsSelector(state),
    creditCards: creditCardsSelector(state),
})

export default connect(mapStateToProps)(Draggable)
