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


class LinksAfterLoggedin extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Gradonline
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="SignOut" className="nav-link"><button id="signnav" className="btn btn-primary">Sign Out</button></Link>
                        </Item>
                      
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default LinksAfterLoggedin
