import React, { Component } from 'react'
import styled from 'styled-components'

import background from '../background.jpeg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brangradds',
})``

class background extends Component {
    render() {
        return (
            <Wrapper>
                <img src={background} width="100%" height="400"  />
            </Wrapper>
        )
    }
}

export default background
