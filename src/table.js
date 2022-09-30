import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Token from './token'
import { WhiteButton } from './button'
import { ScoreContext } from './App'

const TableStyled = styled.div`
    display: grid;
    grid-template-columns: 130px 130px;
    justify-content: center;
    justify-items: center;
    grid-gap: 30px 50px;
    margin: 2em 0;
    position: relative;
    & div:nth-of-type(3) {
        grid-column: span 2;
    }
    .in-game{
        text-align: center;
        text-transform: uppercase;
        font-size: .8em;
        font-weight: 700;
        letter-spacing:1px;
    }
    .results {
        text-align: center;
        h2 {
            text-transform: uppercase;
            font-size: 56px;
            margin:10px;
        }
    }
    .line {
        display: ${({playing}) => !playing ? 'block' : 'none'};
        height: 10px;
        background: rgba(0,0,0,.2);
        position: absolute;
        width: 200px;
        top: 58px;
        &:before{
            content: "";
            height: 15px;
            background: rgba(0,0,0,.2);
            position: absolute;
            left:0px;
            right: 0px;
            top: 0;
            transform: rotate(60deg); 
            transform-origin: left top;
        }
        &:after {
            content: "";
            height: 15px;
            background: rgba(0,0,0,.2);
            position: absolute;
            left:0px;
            right: 0px;
            top: 0;
            transform: rotate(-60deg); 
            transform-origin: right top;
        }
    }
    @media screen and (min-width: 768px){
        grid-gap: 30px 140px;
        .line {
            width: 300px
        }
    }
`
const elements = [
    'paper',
    'scissors',
    'rock'
]

function Table() {
    const { score, setScore } = useContext(ScoreContext)
    const [iWon, setIWon]  = useState(false);
    const [results, setResults] = useState('')
    const [housePick, setHousePick] = useState('default');
    const [playing, setPlaying] = useState(false);
    const [pick, setPick] = useState('');
    function getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min)) + min
    }
    function launchHousePick(){
        return new Promise((resolve, reject) => {
        let pick
        
        const interval = setInterval(() => {
            pick = elements[getRandomInt(0,3)]
            setHousePick(pick)
        }, 75)

        setTimeout(() =>{
            clearInterval(interval)
            resolve(pick)
            },2000)
        })
        
        //return elements[getRandomInt(0,3)];
    }

    async function onClick(name){
        setPlaying(true); 
        setPick(name)
        const house = await launchHousePick();
        const results = playWithIA(name, house);
        setResults(results)
        if(results == 'win'){
            setScore(score+1)
            setIWon(true)
        }
    }

    function playWithIA(pick, housePick) {
        if(housePick === pick)
            return 'draw'

        if(pick === 'paper') {
            if (housePick === 'rock') {
                return 'win'
            }
            if (housePick === 'scissors') {
                return 'lose'
            }
        }

        if(pick === 'scissors') {
            if (housePick === 'paper') {
                return 'win'
            }
            if (housePick === 'rock') {
                return 'lose'
            }
        }

        if(pick === 'rock') {
            if (housePick === 'paper') {
                return 'lose'
            }
            if (housePick === 'scissors') {
                return 'win'
            }
        }
     
    }

    function handleTryAgainClick() {
        setPlaying(false);
        setResults('')
    }
    return (
        <TableStyled playing={playing}> 
            {
                !playing ? (
                <>
                <span className="line"></span>
                <Token name="paper" onClick={onClick} />
                <Token name="scissors" onClick={onClick} />
                <Token name="rock" onClick={onClick} />
                </>
                ) : (
                    <>
                    <div className="in-game">
                        <Token name={pick} onClick={onClick} isShadowAnimated={results === 'win'} />
                        <p>You Picked</p>
                    </div>
                    <div className="in-game">
                        <Token name={housePick} onClick={onClick} isShadowAnimated={results === 'lose'} />
                        <p>The house picked</p>
                    </div>
                    <div className="results">
                        {
                            results && (
                            <>
                            <h2>YOU {results}</h2>
                            <WhiteButton onClick={handleTryAgainClick}>
                                Play Again
                            </WhiteButton>
                            </>
                            )
                        }
                        

                    </div>
                    </>
                )
            }
        </TableStyled>
    )
}

export default Table