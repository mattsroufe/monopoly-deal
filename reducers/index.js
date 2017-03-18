import {List, Map} from 'immutable'

const initialState = Map({
  started: false,
  players: List(),
  deck: List(require('../cards.json'))
})

const monopolyDeal = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      let player = Map({clientId: action.clientId, name: action.name})
      let players = List(state.get('players')).push(player)
      return state.set('players', players)
    case 'START_GAME':
      return state.set('started', true)
    default:
      return state
  }
}

export default monopolyDeal
