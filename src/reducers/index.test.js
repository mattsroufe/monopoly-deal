const { monopolyDeal } = require('./index');

const cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

describe('monopolyDeal reducer', () => {
  let initialState = {
    started: false,
    players: [],
    deck: cards
  }

  it('should return the initial state', () => {
    expect(
      monopolyDeal(initialState, {})
    ).toEqual(initialState)
  })

  it('should handle ADD_PLAYER', () => {
    expect(
      monopolyDeal(initialState, {
        type: 'ADD_PLAYER',
        clientId: '1',
        name: 'Matt'
      })
    ).toEqual({"deck": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], "players": ["Matt"], "players:Matt:bank": [], "players:Matt:hand": [], "players:Matt:moveOptions": [], "players:Matt:movesRemaining": 0, "players:Matt:properties": [], "players:Matt:selectedCards": [], "started": false})
  })

  it('should handle START_GAME', () => {
    let state = Object.assign({}, initialState, {
      players: [
        'Matt',
        'Bonnie'
      ]
    });
    expect(
      monopolyDeal(state, {
        type: 'START_GAME'
      })
    ).toEqual({"currentPlayer": "Matt", "deck": [1, 2, 3, 4, 5, 6, 7, 8], "players": ["Matt", "Bonnie"], "players:Bonnie:hand": [9, 10, 11, 12, 13], "players:Matt:hand": [14, 15, 16, 17, 18, 19, 20], "players:Matt:movesRemaining": 3, "started": true})
  })
})
