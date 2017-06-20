import styled from 'styled-components'
import { spring } from 'react-motion'
import {
    skinUrl,
    mediaQry,
    maxWidth,
    colorGrey,
    colorGreyDark,
    colorOrange,
} from 'Config'

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * TYPOGRAPHY
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const SubTitle = styled.p`
    font-size: 18px;
    width: 100%;
    font-weight: 600;
    margin-bottom: 10px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
`

export const WelcomeMsg = styled.div`
    text-align: center;
    margin: 0 auto 20px;
`

export const WelcomeMsgH = styled.p`
    display: block;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-size: 20px;
`

export const WelcomeMsgP = styled.p`
    display: block;
    font-size: 14px;
`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * WRAPPER & COMMON DIVS
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const TopMenu = styled.div`
    width: 100%;
    height: 100px;
    background: #fff;
    border-bottom: 1px solid ${colorGrey};
`

export const TopMenuMaxWrapper = styled.div`
    max-width: 1170px;
    position: relative;
    margin: 0 auto;
    text-align: center;
`

export const TopIconsWrapper = styled.div`
    position: absolute;
    z-index: 999;
    left: 0;
    top: 28px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (min-width: ${mediaQry}px) {
        width: 250px;
    }
`

export const MaxWrapper = styled.div`
    max-width: 90%;
    margin: 0 auto;
    text-align: center;
    @media (min-width: ${mediaQry}px) {
        width: ${maxWidth}px;
    }
`

export const Footer = styled.div`
    display: none;
    background: #fff;
    width: 100%;
    height: 100px;
    @media (min-width: ${mediaQry}px) {
        display: block;
    }
`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * FORM ELEMENTS
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const InputText = styled.input`
    width: 100%;
    border: 0;
    background: transparent;
    border-bottom: 1px solid ${colorGrey};
    border-color: ${props => (props.pass === false ? '#ff0000' : colorGrey)};
    color: ${props => (props.pass === false ? '#ff0000' : colorGreyDark)};
    height: 30px;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 600;
    padding: 0;
`

export const InputTextAbsolute = styled(InputText)`
    position: absolute;
    left: 0;
    z-index: 1;
`

export const Button = styled.button`
    width: 100%;
    background: ${colorOrange};
    border: 0;
    padding: 15px 0;
    marginBottom: 20px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
`

export const ButtonAbsolute = styled(Button)`
    position: absolute;
    left: 0;
    z-index: 1;
`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ICONS
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const Logo = styled.img`
    display: inline-block;
    height: 74px;
    margin: 8px auto 0;
`

export const Icon = styled.div`
    width: 40px;
    height: 40px;
    background-position: ${props => (props.active ? '0 100%' : '0 0')};
    background-repeat: no-repeat;
    background-size: cover;
`

export const IconHome = styled(Icon)`
    background-image: url(${skinUrl}/images/icns/icn_home.svg);
`

export const IconAccount = styled(Icon)`
    background-image: url(${skinUrl}/images/icns/icn_account.svg);
`

export const IconCart = styled(Icon)`
    background-image: url(${skinUrl}/images/icns/icn_cart.svg);
`

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ANIMATIONS
 * © m.palma
 * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export const animateOpacity = (section = false) => ({
    X: !section
        ? spring(100, { stiffness: 340, damping: 40 })
        : spring(0, { stiffness: 340, damping: 40 }),
})

export const animatePane = (section = false) => ({
    X: !section
        ? spring(100, { stiffness: 340, damping: 40 })
        : spring(0, { stiffness: 340, damping: 40 }),
})

export const animateForm = (isOpen = false) => {
    const TOP = {
        login: 350,
        register: 415,
        forgotPassword: 500,
    }
    const SPRING = {
        login: { stiffness: 350, damping: 30 },
        register: { stiffness: 350, damping: 30 },
        forgotPassword: { stiffness: 350, damping: 30 },
    }

    return {
        login: {
            email: {
                top: !isOpen
                    ? spring(TOP.login, SPRING.login)
                    : spring(TOP.login - 115, SPRING.login),
            },
            pass: {
                top: !isOpen
                    ? spring(TOP.login, SPRING.login)
                    : spring(TOP.login - 55, SPRING.login),
            },
            button: {
                top: !isOpen
                    ? spring(TOP.login, SPRING.login)
                    : spring(TOP.login + 5, SPRING.login),
            },
            toggleButton: {
                top: !isOpen
                    ? spring(TOP.login, SPRING.login)
                    : spring(TOP.login + 65, SPRING.login),
            },
            forgotButton: {
                top: !isOpen
                    ? spring(TOP.login, SPRING.login)
                    : spring(TOP.login + 125, SPRING.login),
            },
        },
        register: {
            firstname: {
                top: !isOpen
                    ? spring(TOP.register, SPRING.register)
                    : spring(TOP.register - 305, SPRING.register),
            },
            lastname: {
                top: !isOpen
                    ? spring(TOP.register, SPRING.register)
                    : spring(TOP.register - 245, SPRING.register),
            },
            customer_telephone: {
                top: !isOpen
                    ? spring(TOP.register, SPRING.register)
                    : spring(TOP.register - 185, SPRING.register),
            },
            email: {
                top: !isOpen
                    ? spring(TOP.register, SPRING.register)
                    : spring(TOP.register - 125, SPRING.register),
            },
            pass: {
                top: !isOpen
                    ? spring(TOP.register, SPRING.register)
                    : spring(TOP.register - 65, SPRING.register),
                zIndex: !isOpen ? 1 : 6,
            },
            privacy: {
                top: !isOpen
                    ? spring(TOP.register, SPRING.register)
                    : spring(TOP.register - 5, SPRING.register),
            },
            button: {
                top: !isOpen
                    ? spring(TOP.register, SPRING.register)
                    : spring(TOP.register + 35, SPRING.login),
                zIndex: !isOpen ? 1 : 3,
            },
            toggleButton: {
                top: !isOpen
                    ? spring(TOP.register, SPRING.register)
                    : spring(TOP.register + 95, SPRING.register),
                zIndex: !isOpen ? 2 : 5,
            },
        },
        forgotPassword: {
            email: {
                top: !isOpen
                    ? spring(TOP.forgotPassword, SPRING.forgotPassword)
                    : spring(TOP.forgotPassword - 150, SPRING.forgotPassword),
            },
            button: {
                top: !isOpen
                    ? spring(TOP.forgotPassword, SPRING.forgotPassword)
                    : spring(TOP.forgotPassword - 80, SPRING.forgotPassword),
            },
            toggleButton: {
                top: !isOpen
                    ? spring(TOP.forgotPassword, SPRING.forgotPassword)
                    : spring(TOP.forgotPassword - 25, SPRING.forgotPassword),
            },
        },
    }
}
