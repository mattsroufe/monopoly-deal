import React from 'react';
import ReactDOM from 'react-dom';

const io = require('../node_modules/socket.io/node_modules/socket.io-client');
const socket = io();

let clientId;
socket.on('connect', function () {
  clientId = socket.id;
});

const addPlayer = (e) => {
  e.preventDefault();
  socket.emit('action', {
    type: 'ADD_PLAYER',
    clientId: clientId,
    name: document.getElementById('name').value
  });
}

const startGame = () => {
  socket.emit('action', {
    type: 'START_GAME'
  });
}

const ClientApp = ({started, players}) => {
  let player = {};
  players.map((p) => {
    if ( p.clientId === clientId ) {
      player = p
    }
  });
  return (
    <div>
      <h1>Monopoly Deal</h1>
      <p>{clientId}</p>
      {player.name ? (
        <h2>{player.name}</h2>
      ) : (
        <form onSubmit={addPlayer}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          <input type="submit" value="Submit" />
        </form>
      )}
      {players.length > 1 && !started &&
        <button onClick={startGame}>Start Game</button>
      }
    </div>
  )
}

ClientApp.defaultProps = {
  players: []
}

socket.on('data', function (data) {
  ReactDOM.render(
    <ClientApp {...data} />,
    document.getElementById('app')
  );
});

