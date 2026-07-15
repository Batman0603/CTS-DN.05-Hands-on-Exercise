import React from "react";
import "./App.css";
import office from "./office.png";

function App() {

  // Element (same as shown in hint)
  const element = "Office Space";

  // JSX Attribute
  const jsxatt = (
    <img
      src={office}
      width="25%"
      height="25%"
      alt="Office Space"
    />
  );

  // Object
  const ItemName = {
    Name: "DBS",
    Rent: 50000,
    Address: "Chennai"
  };

  // List of Objects
  const officeList = [
    {
      Name: "DBS",
      Rent: 50000,
      Address: "Chennai"
    },
    {
      Name: "Regus",
      Rent: 70000,
      Address: "Bangalore"
    },
    {
      Name: "WeWork",
      Rent: 90000,
      Address: "Hyderabad"
    },
    {
      Name: "SmartWorks",
      Rent: 45000,
      Address: "Pune"
    }
  ];

  return (
    <div className="App">

      <h1>
        {element}, at Affordable Range
      </h1>

      {/* Image */}
      {jsxatt}

      <br />
      <br />

      {/* Object Details */}

      <h1>Name: {ItemName.Name}</h1>

      <h3
        className={
          ItemName.Rent <= 60000
            ? "textRed"
            : "textGreen"
        }
      >
        Rent: Rs. {ItemName.Rent}
      </h3>

      <h3>Address: {ItemName.Address}</h3>

      <hr />

      <h2>List of Office Spaces</h2>

      {
        officeList.map((item, index) => (

          <div key={index}>

            <img
              src={office}
              width="25%"
              height="25%"
              alt="Office Space"
            />

            <h2>Name: {item.Name}</h2>

            <h3
              className={
                item.Rent <= 60000
                  ? "textRed"
                  : "textGreen"
              }
            >
              Rent: Rs. {item.Rent}
            </h3>

            <h3>Address: {item.Address}</h3>

            <hr />

          </div>

        ))
      }

    </div>
  );
}

export default App;