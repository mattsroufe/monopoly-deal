import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3000");
let cards;
let currentPlayer;

class App extends Component {
  componentDidMount() {
    fetch('cards.json').then(response => response.json()).then(data => cards = data)
    socket.on('data', function(data) {
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

  startGame() {
    socket.emit('action', {
      type: 'START_GAME'
    });
  }

  render() {
    if (currentPlayer) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div style={{textAlign:'left', margin: '32px'}}>
            <form onSubmit={this.addPlayer}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
              <input type="submit" value="Submit" />
            </form>
            <br></br>
            <button onClick={this.startGame}>Start game</button>
            {this.state.started ?
              <div>
                <p>{this.state.currentPlayer} it's your turn</p>
                <pre>{JSON.stringify({
                  hand: this.state.players[this.state.currentPlayer].hand.map((c) => { return cards[c] })
                }, null, 2)}
                </pre>
              </div>
            :
              <h1>Not Started</h1>
            }
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
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
