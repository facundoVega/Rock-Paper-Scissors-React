import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './button';

const RulesStyled = styled.div`
&::before{
    content:'';
    z-index: 1;
    display: ${({visible})=> visible ? 'block' : 'none'}
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,.6);
}
text-align: center;
.close-button {
    margin-top: 2em;
}

.rules-overlay {
    background: white;
    position:fixed;
    left:0;
    right:0;
    top:0;
    padding:  4em 0;
    bottom:0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction:column;
    h2{
        color: #3B4262;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: -2px;
        margin-bottom: 1em;
    }

}
@media screen and (min-width: 768px) {
    .button {
        position: fixed;
        right:1em;
        bottom: 1em;
    }
    .rules-overlay {
        border-radius: 10px;
        width: 400px;
        margin: auto;
        top: 200px;
        bottom: initial;
        transform: translateY(50%)
        padding: 2em;
        padding-top:40px;
        box-sizing: border-box;

        h2 {
            align-self: flex-start;
            font-size:32px;
            margin: 0 0 1.2em 0;
            margin-left:10px;
        }
    }
    .close-button{
        position: absolute;
        right: 1em;
        top: .8em;

    }


}
`

function Rules() {
    const [visible, setVisible] = useState(false);

    function toggleClick(){
        setVisible(!visible)
    }
    return (
        <RulesStyled visible={visible}>
            {
                visible && 
                <div className="rules-overlay">
                    <h2>Rules</h2>
                    <img src="./images/image-rules.svg" alt="Game Rules"/>
                    <img className="close-button" onClick={toggleClick} src="./images/icon-close.svg" alt="Icon close"/>
                </div>
            }
            <Button onClick={toggleClick} className="button">
                Rules
            </Button>
        </RulesStyled>
    )
}

export default Rules