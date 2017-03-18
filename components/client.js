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

const ClientApp = ({started, players}) => (
  <div>
    <h1>Client App</h1>
    <p>{clientId}</p>
    {false && players[clientId].name ? (
      <h2>{players[clientId].name}</h2>
    ) : (
      <form onSubmit={addPlayer}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <input type="submit" value="Submit" />
      </form>
    )}
    {Object.keys(players).length > 1 && !started &&
      <button onClick={startGame}>Start Game</button>
    }
  </div>
)

ClientApp.defaultProps = {
  players: []
}

socket.on('data', function (data) {
  ReactDOM.render(
    <ClientApp {...data} />,
    document.getElementById('app')
  );
});

