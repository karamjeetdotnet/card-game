import React from 'react';
const Landing = props => (<>
<h2 className="text-center">Memory Game</h2>
    <div className="container">
        <h3>Please select game difficulty</h3>
        <div class="row">
        {props.difficultyTypes.map(x => 
  <div className="col-sm-4" onClick={e => props.startGame(x.value)}>
    <div class="card">
      <div class="card-body">
        <h5 class="text-center">{x.text}</h5>
      </div>
    </div>
  </div>
)}</div>
<div className="float-right mt-3"><div className="btn btn-flat">Start Game Board</div></div>
    </div>
</>);
export default Landing;