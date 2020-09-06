import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

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

class NavBar extends Component {
    render() {
        return (
            
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
           
        )
    }
}

export default NavBar