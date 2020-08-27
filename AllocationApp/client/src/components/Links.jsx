import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav ml-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``


class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Gradonline
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="SignIn" className="nav-link"><button id="signnav" className="btn btn-primary">Sign In</button></Link>
                        </Item>
                        <Item>
                            <Link to="Register" className="nav-link"><button id="signnav" className="btn btn-primary">Sign Up</button></Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
