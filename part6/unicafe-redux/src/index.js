import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";
import "./index.css";

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const neutral = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const reset = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div className="container">
      <button className="btn" onClick={good}>
        good
      </button>
      <button className="btn" onClick={neutral}>
        neutral
      </button>
      <button className="btn" onClick={bad}>
        bad
      </button>
      <button className="btn" onClick={reset}>
        reset stats
      </button>
      <div className="stats__container">
        <div>
          <span className="stats__name">good</span>{" "}
          <span>{store.getState().good}</span>
        </div>
        <div>
          <span className="stats__name">neutral</span>{" "}
          <span>{store.getState().ok}</span>
        </div>
        <div>
          <span className="stats__name">bad</span>{" "}
          <span>{store.getState().bad}</span>
        </div>
      </div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
