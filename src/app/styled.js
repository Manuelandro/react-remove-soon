import styled from 'styled-components'
import { mediaQry, skinUrl, colorOrange } from 'Config'

export const LoaderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`

export const RequestLoaderContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: rgba(255,255,255,.6);
    position: fixed;
    z-index: 10001;
    left: 0;
    top: 0;
`

export const Loader = styled.img`
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    width: 20%;
    max-width: 75px;
    min-width: 50px;
`

export const BottomMenu = styled.div`
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    z-index: 10000;
    background: #fff;
`

export const FlexMenu = styled.ul`
    display: flex;
`

export const Voices = styled.li`
    display: inline-block;
    flex: 1;
`

export const CartCounter = styled.span`
    font-size: 12px;
    color: #fff;
    background: ${colorOrange};
    border-radius: 100%;
    text-decoration: none;
    position: absolute;
    z-index: 2;
    top: 14px;
    left: 8px;
    @media (min-width: ${mediaQry}px) {
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 11px;
        top: 9px;
        left: 24px;
    }
`
