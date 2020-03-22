import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

// Creating a reusable title element.
// For accessibility the page should have only one h1 element,
// so we can't just return a title with an h1 (because we want to use
// the title two times on the page). The element prop can be used to specify
// the HTML element you want to display, like h1, h2 etc.
const Title = ({ children, element = "h2" }) => {
  const Element = element;
  return <Element>{children}</Element>;
};

const Button = ({ children, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <th scope="row">{text}</th>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  // Only display statistics when feedback is given.
  if (total === 0) {
    return <p>No feedback given.</p>;
  } else {
    return (
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          {/* Total number of collected feedback  */}
          <Statistic text="All" value={total} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = total
    ? ((good * 1 + neutral * 0 + bad * -1) / total).toFixed(1)
    : 0;
  const positive = total ? `${((good / total) * 100).toFixed(1)}%` : "0%";

  return (
    <main className="unicode-container">
      <Title element="h1">Give feedback</Title>
      <div className="unicode-flexrow">
        <Button
          className="button"
          onClick={() => setGood(prevVal => prevVal + 1)}
        >
          Good
        </Button>
        <Button
          className="button"
          onClick={() => setNeutral(prevVal => prevVal + 1)}
        >
          Neutral
        </Button>

        <Button
          className="button"
          onClick={() => setBad(prevVal => prevVal + 1)}
        >
          Bad
        </Button>
      </div>
      <Title>Statistics</Title>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
