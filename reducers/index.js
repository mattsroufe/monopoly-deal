import {List, Map} from 'immutable'

const initialState = Map({players: Map()})

const monopolyDeal = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return state.updateIn(['players', action.clientId], value => Map())
    default:
      return state
  }
}

export default monopolyDeal
