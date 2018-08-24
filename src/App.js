import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3000");
let cards;
let currentPlayer;

class App extends Component {
  componentDidMount() {
    fetch('cards.json').then(response => response.json()).then(data => cards = data)
    socket.on('data', function(data) {
      console.log(data);
      if (Object.keys(data.players).length === 0) {
        currentPlayer = null
      }
      this.setState(data);
    }.bind(this));
  }

  addPlayer(e) {
    e.preventDefault();
    currentPlayer = document.getElementById('name').value;
    socket.emit('action', {
      type: 'ADD_PLAYER',
      name: currentPlayer
    });
  }

  toggleSelected(card) {
    return (event) => {
      let action = {
        type: 'TOGGLE_SELECTED',
        player: currentPlayer,
        cardId: card.id
      };
      socket.emit('action', action);
      event.preventDefault();
    }
  }

  startGame() {
    socket.emit('action', {
      type: 'START_GAME'
    });
  }

  render() {
    if (currentPlayer) {
      let selectedCards = this.state[`players:${currentPlayer}:selectedCards`] || [];
      return (
        <div className="App">
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1 className="App-title">Monopoly Deal</h1>
          </header>
          <div style={{textAlign:'left', margin: '32px'}}>
            <h2>
              {currentPlayer}
              {currentPlayer === this.state.currentPlayer ? <span> - it's your turn</span> : <span></span>}
            </h2>
            <p>
              {this.state.players.map((playerName, i) => {
                if (i !== 0) {
                  return (
                    <span key={i}> | <a href="#">{playerName}</a></span>
                  )
                }
                return <span key={i}>Players: <a href="#">{playerName}</a></span>
              })}
            </p>
            {this.state.started ?
              <div>
                <h2>Your hand:</h2>
                <div className='cards'>
                  {this.state[`players:${currentPlayer}:hand`].map((cardId, i) => {
                    let card = cards[cardId]
                    let className = ''
                    if ( card.group || card.groups ) {
                      className = card.group || card.groups && card.groups.join('-')
                    } else if ( card.type === 'money' ) {
                      className = 'money-' + card.value
                    }
                    if ( className === 'utility' || card.type === 'action' ) {
                      className = card.name.split(' ').join('-').toLowerCase()
                    }
                    if (selectedCards.includes(cardId)) {
                      className += ' selected'
                    }
                    return (
                      <div className={'card ' + className} key={i} onClick={this.toggleSelected(card)}>
                        <p>{card.value}</p>
                        <p>{card.name || card.type}</p>
                      </div>
                    )
                  })}
                </div>
                <h2>Your properties:</h2>
                {this.state[`players:${currentPlayer}:properties`].length === 0 ? <p>You have no properties.</p> : <span></span>}
                <div className='cards'>
                  {this.state[`players:${currentPlayer}:properties`].map((cardId, i) => {
                    let card = cards[cardId]
                    let className = ''
                    if ( card.group || card.groups ) {
                      className = card.group || card.groups && card.groups.join('-')
                    } else if ( card.type === 'money' ) {
                      className = 'money-' + card.value
                    }
                    if ( className === 'utility' || card.type === 'action' ) {
                      className = card.name.split(' ').join('-').toLowerCase()
                    }
                    return <div className={'card ' + className} key={i}>{card.name || card.type}</div>
                  })}
                </div>
                <h2>Your bank: $0</h2>
              </div>
            :
              <button onClick={this.startGame}>Start game</button>
            }
            {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1 className="App-title">Monopoly Deal</h1>
          </header>
          <div style={{textAlign:'left', margin: '32px'}}>
            <form onSubmit={this.addPlayer}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default App;
