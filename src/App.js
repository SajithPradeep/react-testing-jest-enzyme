import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const decrementCount = () => {
    if (count === 0) {
      setError(true);
      return setCount(0);
    }
    setCount(count - 1);
  };
  return (
    <div className="App" data-test="app-component">
      <h1> Learn React</h1>
      <h2 data-test="counter-display">
        <span>Counter Display value</span>
        <span data-test="count">{count}</span>
      </h2>
      <button
        onClick={() => {
          setError(false);
          setCount(count + 1);
        }}
        data-test="counter-button"
      >
        Increment Count
      </button>
      <button onClick={decrementCount} data-test="decrement-button">
        Decrement Count
      </button>
      {error && <div data-test="error">Count cannot go below zero</div>}
    </div>
  );
}

export default App;
