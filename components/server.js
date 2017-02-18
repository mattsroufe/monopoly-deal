import React from 'react';
import ReactDOM from 'react-dom';

var io = require('socket.io-client');

var socket = io();
socket.on('data', function (data) {
  console.log(JSON.stringify(data, null, 2));
});

ReactDOM.render(
  <h1>Server App</h1>,
  document.getElementById('app')
);
