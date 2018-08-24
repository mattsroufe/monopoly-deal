const cards = require('../public/cards.json');

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const initialState = {
  started: false,
  players: {},
  deck: shuffle(Object.keys(cards))
};

const monopolyDeal = (state = initialState, action) => {
  let players;
  console.log(action)
  switch (action.type) {
    case 'ADD_PLAYER':
      players = Object.assign({}, state.players, {
        [action.name]: {
          name: action.name,
          bank: [],
          hand: [],
          properties: []
        }
      });
      return Object.assign({}, state, {players});
    case 'START_GAME':
      let deck = state.deck.slice(0)
      let playerNames = Object.keys(state.players)
      let currentPlayer = playerNames[0]
      players = {};
      playerNames.forEach((name, i) => {
        const numToTake = i == 0 ? 7 : 5
        players[name] = Object.assign({}, state.players[name], {
          hand: deck.splice(Math.max(deck.length - numToTake))
        })
      })
      return Object.assign({}, state, {
        started: true,
        currentPlayer,
        turnOrder: playerNames,
        players,
        deck
      });
    case 'TOGGLE_SELECTED':
      let attr = `players:${action.player}:selectedCards`;
      return Object.assign({}, state, {
        [attr]: (state[attr] || []).concat([action.cardId])
      });
    default:
      return state
  }
};

exports.monopolyDeal = monopolyDeal;
