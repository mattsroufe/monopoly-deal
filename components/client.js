import React from 'react';
import ReactDOM from 'react-dom';
import Table from './table'

const io = require('../node_modules/socket.io/node_modules/socket.io-client');
const socket = io();


let props = {
  players: [
    {
      name: 'matt',
      sets: [
        [
          {
            "id": "7",
            "type": "property",
            "name": "Northcuberland Avenue",
            "group": "pink",
            "rent": {
              "1": 1,
              "2": 2,
              "3": 4
            },
            "value": 2
          }
        ],
        [
          {
            "id": "22",
            "type": "property",
            "name": "Mayfair",
            "group": "darkblue",
            "rent": {
              "1": 3,
              "2": 8
            },
            "value": 4
          }
        ]
      ]
    },
    {
      name: 'bonnie',
      sets: []
    }
  ]
};

let clientId = localStorage.getItem('clientId');
socket.on('connect', () => {
  if ( !clientId ) {
    clientId = socket.id
    localStorage.setItem('clientId', clientId);
  }
});

const addPlayer = (e) => {
  e.preventDefault();
  socket.emit('action', {
    type: 'ADD_PLAYER',
    clientId: clientId,
    name: document.getElementById('name').value
  });
}

const startGame = () => {
  socket.emit('action', {
    type: 'START_GAME'
  });
}

const ClientApp = ({started, players}) => {
  let player = {};
  players.map((p) => {
    if ( p.clientId === clientId ) {
      player = p
    }
  });
  return (
    <div>
      <h3>Monopoly Deal</h3>
      {player.clientId ? (
        <div>
          <strong>{player.name}</strong>
          <p>In hand:</p>
          <ul>
            {player.cards && player.cards.map((card, i) => {
              return <li className={card.group} key={i}></li>
            })}
          </ul>
        </div>
      ) : (
        <form onSubmit={addPlayer}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          <input type="submit" value="Submit" />
        </form>
      )}
      {players.length > 0 && !started &&
        <button onClick={startGame}>Start Game</button>
      }
    </div>
  )
}

ClientApp.defaultProps = {
  players: []
}

socket.on('data', function (data) {
  ReactDOM.render(
    <ClientApp {...data} />,
    document.getElementById('app')
  );
});

