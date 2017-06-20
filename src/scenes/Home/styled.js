import styled from 'styled-components'
import { skinUrl, maxWidthForm } from 'Config'

// styles
export const HomeWrapper = styled.div`
    height: 100vh;
    background: #fff url(${skinUrl}/images/home_bg.svg) 50% 0 no-repeat;
`

// login comps
export const Title = styled.h1`
    color: #000;
    font-size: 40px;
    position: absolute;
    width: 100%;
    text-align: center;
    top: 30px;
    font-weight: 600;
`

export const FormContainer = styled.div`
    width: 70%;
    max-width: ${maxWidthForm}px;
    margin: 0 auto;
    position: relative;
    text-align: center;
`

export const ErrorMsg = styled.div`
    color: #ff0000;
    fontSize: 12px;
    position: absolute;
    marginTop: ${props => (!props.passed ? '48px' : '0')};
    display: ${props => (props.isopen ? 'block' : 'none')};
`

export const ErrorMsgCheckbox = styled.div`
    color: #ff0000;
    fontSize: 12px;
    position: absolute;
    marginTop: ${props => (!props.passed ? '5px' : '-999999px')};
    display: ${props => (props.isopen ? 'block' : 'none')};
    marginLeft: 40px;
`

export const GeneralErrorMessage = styled.div`
    color: #ff0000;
    fontSize: 12px;
    marginLeft: 40px;
    display: ${props => (props.isopen ? 'block' : 'none')};
`

export const ForgotLink = styled.p`
    width: 100%;
    padding: 15px 0;
    text-align: left;
    marginBottom: 20px;
    font-size: 12px;
    font-weight: 600;
    position: absolute;
    left: 0;
    z-index: 1;
`

// register comps
export const Checkbox = styled.input`
    width: 25px;
    border: 2px solid #000;
    height: 25px;
    margin-bottom: 10px;
    position: absolute;
    outline: 1px solid transparent;
    left: 0;
    z-index: 1;
    font-size: 12px;
    font-weight: 600;
    padding: 0 5px;
`
