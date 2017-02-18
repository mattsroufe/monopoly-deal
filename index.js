import { createStore } from 'redux';
import {List, Map} from 'immutable';

const initialState = Map({players: Map()});

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', function (socket) {
  console.log(socket.client.conn.id);
  io.emit('data', initialState.toJS());
});

http.listen(3000, function() {
  console.log('listening on localhost:3000');
});
