import {List, Map, fromJS} from 'immutable'

const initialState = fromJS({
  started: false,
  players: [],
  deck: require('../cards.json')
})

const monopolyDeal = (state = initialState, action) => {
  let players;
  switch (action.type) {
    case 'ADD_PLAYER':
      players = state.get('players').push(Map({clientId: action.clientId, name: action.name}))
      return state.set('players', players)
    case 'START_GAME':
      players = List();
      state.get('players').map((player) => {
        players = players.push(fromJS(player).merge({cards: []}));
      });
      return state.merge({started: true}, {players: players});
    default:
      return state
  }
}

export default monopolyDeal
