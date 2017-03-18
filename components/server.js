import React from 'react';
import ReactDOM from 'react-dom';

const io = require('../node_modules/socket.io/node_modules/socket.io-client');
const socket = io();

const ServerApp = (props) => (
  <div>
    <h1>Server App</h1>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
)

ServerApp.defaultProps = {
  players: []
}

socket.on('data', function (data) {
  ReactDOM.render(
    <ServerApp {...data} />,
    document.getElementById('app')
  );
});

