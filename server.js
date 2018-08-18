const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(process.env.PORT || 8080);
