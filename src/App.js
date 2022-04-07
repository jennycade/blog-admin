// import './App.css';

import React from 'react';
import { useState } from 'react';

const App = () => {
  const [heading, setHeading] = useState("Magnificent Monkeys");
  // const [heading, setHeading] = useState('Malefecent monkeys');

  const clickHandler = () => {
    setHeading("Radical Rhinos");
  };

  return (
    <>
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      <h1>{heading}</h1>
    </>
  );
}

export default App;
