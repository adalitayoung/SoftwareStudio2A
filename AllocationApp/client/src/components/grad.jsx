import React, { Component } from 'react'
import styled from 'styled-components'

import grad from '../res/grad.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brangradds',
})``

class grad extends Component {
    render() {
        return (
            <Wrapper>
                <img src={grad} width="70" height="70"  />
            </Wrapper>
        )
    }
}

export default grad
