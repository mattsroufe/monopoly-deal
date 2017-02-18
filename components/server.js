import React from 'react';
import ReactDOM from 'react-dom';

const io = require('socket.io-client');
const socket = io();

const ServerApp = ({players}) => (
  <div>
    {console.log(players)}
    <h1>Server App</h1>
    <ul>
      {Object.keys(players).map((player) =>
        <li key={player}>{player}</li>
      )}
    </ul>
  </div>
)

ServerApp.defaultProps = {
  players: []
}

socket.on('data', function (data) {
  console.log(JSON.stringify(data, null, 2));
  ReactDOM.render(
    <ServerApp {...data} />,
    document.getElementById('app')
  );
});

