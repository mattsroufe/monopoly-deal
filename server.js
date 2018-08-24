const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { createStore } = require('redux');
const { monopolyDeal } =  require('./reducers');
const store = createStore(monopolyDeal);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', function(socket) {
  socket.on('action', (action) => {
    store.dispatch(action);
    io.emit('data', store.getState());
  });
  io.emit('data', store.getState());
});

http.listen(process.env.PORT || 8080);
