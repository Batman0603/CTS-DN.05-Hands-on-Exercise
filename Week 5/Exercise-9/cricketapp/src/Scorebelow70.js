import React from "react";

function Scorebelow70(props) {

  let players70 = [];

  props.players.map((item) => {
    if (item.score <= 70) {
      players70.push(item);
    }
  });

  return (
    <div>
      <ul>
        {players70.map((item, index) => (
          <li key={index}>
            Mr. {item.name} {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scorebelow70;