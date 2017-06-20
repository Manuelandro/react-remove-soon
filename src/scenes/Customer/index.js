import React from 'react'
import MediaQuery from 'react-responsive'
import { mediaQry } from 'Config'
import DeskDash from './components/desk.dash'
import MobileDash from './components/mobile.dash'

const Customer = () => (
    <div>
        <MediaQuery minDeviceWidth={mediaQry}>
            <DeskDash />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={mediaQry - 1}>
            <MobileDash />
        </MediaQuery>
    </div>
)

export default Customer
