import React from 'react'
import Login from './components/login'
import Register from './components/register'
import ForgotPassword from './components/forgotpassword'
import { HomeWrapper } from './styled'

const Home = props => (
    <HomeWrapper>
        <Login />
        <Register />
        <ForgotPassword />
    </HomeWrapper>
)

export default Home
