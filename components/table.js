import React from 'react';

const Table = (props) => {
  return (
    <div className="table">
      {props.players.map((player, i) => {
        return (
          <div key={i}>
            <strong>{player.name}</strong>
            <p>In hand:</p>
            <ul>
              {player.sets.map((set) => {
                return (
                  set.map((card, j) => {
                    return <li className={card.group || card.groups.join('-') } key={j}></li>
                  })
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default Table;

