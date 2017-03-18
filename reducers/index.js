import {List, Map, fromJS} from 'immutable'

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

const initialState = fromJS({
  started: false,
  players: [],
  deck: shuffle(require('../cards.json'))
})

const monopolyDeal = (state = initialState, action) => {
  let players, deck;
  switch (action.type) {
    case 'ADD_PLAYER':
      players = state.get('players').push(Map({clientId: action.clientId, name: action.name}))
      return state.set('players', players)
    case 'START_GAME':
      players = List();
      deck = state.get('deck');
      state.get('players').map((player) => {
        players = players.push(fromJS(player).merge({cards: deck.take(5)}));
        deck = deck.slice(5, deck.length)
      });
      return state.merge({started: true, deck: deck}, {players: players});
    default:
      return state
  }
}

export default monopolyDeal
