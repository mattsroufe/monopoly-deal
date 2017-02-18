import React from 'react';
import ReactDOM from 'react-dom';

const io = require('socket.io-client');
const socket = io();

let clientId;
socket.on('connect', function () {
  clientId = socket.id;
  console.log(clientId);
});

const submitName = (e) => {
  socket.emit('action', {
    type: 'SET_PLAYER_NAME',
    clientId: clientId,
    value: document.getElementById('name').value
  });
  e.preventDefault();
}

const ClientApp = ({players}) => (
  <div>
    {console.log(players)}
    <h1>Client App</h1>
    <p>{clientId}</p>
    {players[clientId].name ? (
      <h2>{players[clientId].name}</h2>
    ) : (
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <input onClick={submitName} type="submit" value="Submit" />
      </div>
    )}
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

