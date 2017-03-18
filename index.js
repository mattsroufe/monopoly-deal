import { createStore } from 'redux'
import monopolyDeal from './reducers'

let store = createStore(monopolyDeal)

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', function (socket) {
  socket.on('action', (action) => {
    store.dispatch(action);
    io.emit('data', store.getState().toJS());
  });
  io.emit('data', store.getState().toJS());
});

http.listen(3000, function() {
  console.log('listening on localhost:3000');
});
