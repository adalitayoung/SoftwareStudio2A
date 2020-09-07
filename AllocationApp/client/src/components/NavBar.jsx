import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'
import LinksAfterLoggedin from './LinksAfterLoggedin'



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

const token = localStorage.getItem("Token");

        return (
            
                <Nav>
                    <Logo />
                 
                   {token!=null ? <LinksAfterLoggedin /> : <Links /> }
                </Nav>
           
        )
    }
}

export default NavBar