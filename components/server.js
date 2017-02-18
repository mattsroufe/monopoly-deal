import React from 'react';
import ReactDOM from 'react-dom';

const io = require('socket.io-client');
const socket = io();

const ServerApp = ({players}) => (
  <div>
    <h1>Server App</h1>
    <ul>
      {Object.keys(players).map((key) =>
        <li key={key}>{players[key].name}</li>
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

