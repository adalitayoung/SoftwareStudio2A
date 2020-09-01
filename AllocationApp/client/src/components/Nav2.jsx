import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links2 from './Links2'

const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-light ',
})`
    margin-bottom: 20 px;
    padding-right: 50px;
    padding-left:50px;
`

class Nav2 extends Component {
    render() {
        return (

                <Nav>
                    <Logo />
                    <Links2 />
                </Nav>

        )
    }
}

export default Nav2
