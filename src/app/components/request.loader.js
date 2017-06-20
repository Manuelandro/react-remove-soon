import React from 'react'
import { RequestLoaderContainer, Loader } from '../styled'

const skinUrl = window.top.require.baseUrl

const RequstLoader = props => (
    <RequestLoaderContainer>
        <Loader src={`${skinUrl}/images/oval.svg`} alt="" />
    </RequestLoaderContainer>
)

export default RequstLoader
