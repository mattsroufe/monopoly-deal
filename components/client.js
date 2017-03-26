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

socket.on('connect', () => {
});

const addPlayer = (e) => {
  e.preventDefault();
  localStorage.setItem('clientId', socket.id);
  socket.emit('action', {
    type: 'ADD_PLAYER',
    clientId: socket.id,
    name: document.getElementById('name').value
  });
}

const startGame = () => {
  socket.emit('action', {
    type: 'START_GAME'
  });
}

const toggleSelected = (player, card) => {
  return (event) => {
    let action = {
      type: 'TOGGLE_SELECTED',
      clientId: localStorage.getItem('clientId'),
      cardId: card.id
    };
    console.log(action); 
    socket.emit('action', action);
    event.preventDefault();
  }
}

const ClientApp = ({started, players}) => {
  let player = {};
  if ( players.length === 0 ) {
    localStorage.removeItem('clientId')
  }
  players.map((p) => {
    if ( p.clientId === localStorage.getItem('clientId') ) {
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
          <div className='cards'>
            {player.cards && player.cards.map((card, i) => {
              let className
              if ( card.group || card.groups ) {
                className = card.group || card.groups && card.groups.join('-')
              } else if ( card.type === 'money' ) {
                className = 'money-' + card.value
              }
              if ( className === 'utility' || card.type === 'action' ) {
                className = card.name.split(' ').join('-').toLowerCase()
              }
              return <div className={'card ' + className} key={i} onClick={toggleSelected(player, card)}>{card.name || card.type}</div>
            })}
          </div>
          <p>On table:</p>
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

