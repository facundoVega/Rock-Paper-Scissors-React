import React from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.div`
    display: inline-flex;
    border: 1px solid white;
    border-radius: .5em;
    min-width: 128px;
    padding: .5em;
    box-sizing: border-box;
    justify-content: center;
    cursor: pointer;
    text-transfrom: uppercase;
    letter-spacing: 2.5px;
    :hover {
        background: white;
        color: #101a3f;
    }
`



function Button({ children, ...props}) {
    return (
        <ButtonStyled {...props}>
            { children }
        </ButtonStyled>
    )
}

export default Button

export const WhiteButton = styled(ButtonStyled)`
    background: White;
    color: #101a3f;
    min-width: 220px;
`