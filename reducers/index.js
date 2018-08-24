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
  players: [],
  deck: shuffle(Object.keys(cards))
};

const monopolyDeal = (state = initialState, action) => {
  let players;
  console.log(action)
  switch (action.type) {
    case 'ADD_PLAYER':
      return Object.assign({}, state, {
        players: (state.players || []).concat([action.name]),
        [`players:${action.name}:hand`]: [],
        [`players:${action.name}:properties`]: [],
        [`players:${action.name}:bank`]: [],
        [`players:${action.name}:selectedCards`]: [],
      });
    case 'START_GAME':
      let deck = state.deck.slice(0)
      let playerNames = state.players
      let currentPlayer = playerNames[0]
      let playerHands = {}
      playerNames.forEach((name, i) => {
        const numToTake = i == 0 ? 7 : 5
        playerHands[`players:${name}:hand`] = deck.splice(Math.max(deck.length - numToTake))
      })
      return Object.assign({}, state, {
        started: true,
        currentPlayer,
        turnOrder: playerNames,
        deck
      }, playerHands);
    case 'TOGGLE_SELECTED':
      let attr = `players:${action.player}:selectedCards`;
      let selectedCards = state[attr] || []
      let newState
      if (selectedCards.includes(action.cardId)) {
        newState = selectedCards.filter(cardId => cardId !== action.cardId)
      } else {
        newState = selectedCards.concat([action.cardId])
      }
      return Object.assign({}, state, {[attr]: newState});
    default:
      return state
  }
};

exports.monopolyDeal = monopolyDeal;
