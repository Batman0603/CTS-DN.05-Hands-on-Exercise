import React from "react";

function ListofIndianPlayers(props) {
  return (
    <div>
      <ul>
        {props.IndianPlayers.map((item, index) => (
          <li key={index}>Mr. {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListofIndianPlayers;