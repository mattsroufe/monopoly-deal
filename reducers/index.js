import {List, Map} from 'immutable'

const initialState = Map({
  started: false,
  players: Map(),
  deck: List(require('../cards.json'))
})

const monopolyDeal = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return state.updateIn(['players', action.clientId], value => Map())
    case 'SET_PLAYER_NAME':
      return state.updateIn(['players', action.clientId], value => Map({name: action.value}))
    case 'START_GAME':
      return state.set('started', true)
    default:
      return state
  }
}

export default monopolyDeal
