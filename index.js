import { createStore } from 'redux'
import monopolyDeal from './reducers'

let store = createStore(monopolyDeal)

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', function (socket) {
  if ( !socket.handshake.headers.referer.match(/server/g) ) {
    store.dispatch({
      type: 'ADD_PLAYER',
      clientId: socket.client.conn.id
    });
    io.emit('data', store.getState().toJS());
  }
});

http.listen(3000, function() {
  console.log('listening on localhost:3000');
});
