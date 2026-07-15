import React from "react";

function ListofPlayers(props) {
  return (
    <div>
      <ul>
        {props.players.map((item, index) => {
          return (
            <li key={index}>
              Mr. {item.name} <span>{item.score}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListofPlayers;