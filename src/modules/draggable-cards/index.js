const goToCard = ({ slideCount, goTo }) => {
    let newActiveSlide
    if (goTo < 0) newActiveSlide = 0
    else if (goTo > slideCount - 1) newActiveSlide = slideCount - 1
    else newActiveSlide = goTo

    const perc = -(100 / slideCount) * newActiveSlide

    return {
        newSlide: newActiveSlide,
        percentual: perc,
    }
}

const DraggableCards = (params) => {
    const { event, slideCount, activeSlide } = params
    const needToSlide = 25 // 25% of the move

    const percentage = 100 / slideCount * (event.deltaX / window.innerWidth)
    const convert = percentage - 100 / slideCount * activeSlide

    if (event.isFinal) {
        let goTo = activeSlide
        if (event.velocityX > 1) {
            goTo = activeSlide - 1
        } else if (event.velocityX < -1) {
            goTo = activeSlide + 1
        } else if (percentage <= -(needToSlide / slideCount)) {
            goTo = activeSlide + 1
        } else if (percentage >= needToSlide / slideCount) {
            goTo = activeSlide - 1
        } else {
            goTo = activeSlide
        }

        const change = goToCard({ slideCount, goTo })
        return {
            change,
            isFinal: event.isFinal,
        }
    }

    return { isFinal: false, change: { newSlide: null, percentual: convert } }
}

export default DraggableCards
