import React from 'react'
import { LoaderContainer, Loader } from '../styled'

const skinUrl = window.top.require.baseUrl

const AppLoader = props => (
    <LoaderContainer>
        <Loader src={`${skinUrl}/images/oval.svg`} alt="" />
    </LoaderContainer>
)

export default AppLoader
