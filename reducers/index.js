const cards = require('../cards.json');

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
  deck: shuffle(Object.keys(cards)),
  cards
};

const monopolyDeal = (state = initialState, action) => {
  return state;
};

exports.monopolyDeal = monopolyDeal;
