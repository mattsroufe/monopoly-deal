import monopolyDeal from '../reducers/index'
import {fromJS} from 'immutable'

const cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

describe('monopolyDeal reducer', () => {
  let initialState = fromJS({
    started: false,
    players: {},
    deck: cards
  })

  it('should return the initial state', () => {
    expect(
      monopolyDeal(initialState, {})
    ).toEqual(initialState)
  })

  it('should handle ADD_TODO', () => {
    expect(
      monopolyDeal(initialState, {
        type: 'ADD_PLAYER',
        clientId: '1'
      })
    ).toEqual(
      fromJS({
        started: false,
        players: {
          '1': {}
        },
        deck: cards
      })
    )
  })
})
/*
expect(
reducer(
[
{
text: 'Use Redux',
completed: false,
id: 0
}
],
{
type: types.ADD_TODO,
text: 'Run the tests'
}
)
).toEqual(
[
{
text: 'Run the tests',
completed: false,
id: 1
},
{
text: 'Use Redux',
completed: false,
id: 0
}
]
)
})
})
*/
