import React from 'react';
import ReactDOM from 'react-dom';

const io = require('../node_modules/socket.io/node_modules/socket.io-client');
const socket = io();

let clientId;
socket.on('connect', function () {
  clientId = socket.id;
});

const addPlayer = (clientId) => {
  return (e) => ({
    socket.emit('action', {
      type: 'ADD_PLAYER',
      clientId: clientId,
      value: document.getElementById('name').value
    });
    e.preventDefault();
  })
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
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <input onSubmit={addPlayer(clientId)} type="submit" value="Submit" />
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
  console.log(JSON.stringify(data, null, 2));
  ReactDOM.render(
    <ClientApp {...data} />,
    document.getElementById('app')
  );
});

