import React, { useEffect, useState } from 'react';
import Axios from 'axios';
let interval = null;
let cardInterval = null;
const Game = props => {
    const [seconds, setSeconds] = useState(0);
    const [error, setError] = useState(0);
    const [cardIndexes, setCardIndexes] = useState([-1, -1]);
    const [match, setCardMatch] = useState([]);
    const tick = () => {
        setSeconds(seconds => seconds + 1);
    }
    const startTime = () => {
        interval = setInterval(tick, 1000);
    }
    const stopTime = () => {
        clearInterval(interval);
    }
    const hideCard = () => {
        clearInterval(cardInterval);
        Axios.post(`https://localhost:44365/api/game/match/${props.fileId}`, cardIndexes).then(response => {
            if(response.data){
                setCardMatch([
                    ...match, props.destinationCards[cardIndexes[0]]]);
            }else{
                setError(error => error + 1);
            }
            setCardIndexes([-1, -1])
        })
    }
    const revealCard = (cardData) => {
        setCardIndexes(cardData);
    }
    useEffect(() => {
        if(cardIndexes[0] > -1 && cardIndexes[1] > -1){
            cardInterval = setInterval(hideCard, 3000);
        }
    }, cardIndexes)
    useEffect(() => {
        if(match.length === props.destinationCards.length){stopTime()}
    }, [match.length]);
    useEffect(() => {
        startTime();
    }, [])
    return (<>
    <div className="container">
        <div className="d-flex mt-5 justify-content-between">
            <div className="btn btn-primary">
                Elapsed Time {seconds}
            </div>
            <div className="btn btn-info">
                Error Score {error}
            </div>
        </div>
        <div className="row">
{props.destinationCards.map((x, di) => <div className="col-sm-4 mt-2" onClick={() => revealCard([di, cardIndexes[1]])}>
    <div class={`card ${match.indexOf(x) > -1 ? "invisible" : ""}`}>
      <div class="card-body">
        <h5 class={`text-center ${cardIndexes[0] > -1 && di === cardIndexes[0] ? "" : "invisible"}`}>{x}</h5>
      </div>
    </div>
  </div>)}
        </div>
        <hr/>
        <div className="row">
{props.sourceCards.map((x, si) => <div className="col-sm-4 mt-2" onClick={() => revealCard([cardIndexes[0], si])}>
    <div class={`card ${match.indexOf(x) > -1 ? "invisible" : ""}`}>
      <div class="card-body">
        <h5 class={`text-center ${cardIndexes[1] > -1 && si === cardIndexes[1] ? "" : "invisible"}`}>{x}</h5>
      </div>
    </div>
  </div>)}
        </div>
    </div>
    </>)
}
Game.defaultProps = {
    destinationCards : [5,4,3,2,1],
    sourceCards : [1,2,3,4,5]
}
export default Game