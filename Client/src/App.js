import React, { useState } from 'react';
import Landing from './Landing';
import Game from './Game';
import Axios from 'axios';
const difficultyTypes = [
    {
        text: "Easy",
        value: "easy"
    },
    {
        text: "Medium",
        value: "medium"
    },
    {
        text: "Hard",
        value: "hard"
    }
]
const App = () => {
    const [card, setCard] = useState({});
    const startGame = difficulty => {
        Axios.post(`https://localhost:44365/api/game/start/${difficulty}`).then(response => {
            setCard(response.data)
        })
    }
    return (<>
    {
    !card.fileId ? <Landing 
    difficultyTypes={difficultyTypes}
    startGame={startGame}
    />: 
    <Game {...card}/>}
    </>)
}

export default App;