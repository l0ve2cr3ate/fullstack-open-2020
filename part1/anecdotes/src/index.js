import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ children, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

// Create reusable title element. For accessibility page can only contain one h1 element,
// so option is added to select different html element, like h1, h2.
const Title = ({ element = "h2", title }) => {
  const Element = element;
  return <Element>{title}</Element>;
};

const AnecdoteText = ({ anecdote }) => (
  <span className="anecdote-selected">{anecdote}</span>
);

const Vote = ({ voteScore }) => {
  return (
    <span className="anecdote-votes">
      {voteScore === 1 ? `has ${voteScore} vote` : `has ${voteScore} votes`}
    </span>
  );
};

const AnecdoteBody = ({ anecdote, voteScore }) => (
  <div className="anecdote-text">
    <AnecdoteText anecdote={anecdote} />
    <Vote voteScore={voteScore} />
  </div>
);

const Anecdote = ({ element, title, anecdote, voteScore }) => (
  <>
    <Title element={element} title={title} />
    <AnecdoteBody anecdote={anecdote} voteScore={voteScore} />
  </>
);

const App = props => {
  // Create an empty array with length of anecdotes
  const initialVotes = Array(props.anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);
  const [mostVoted, setMostVoted] = useState(0);

  // Generate a random number between 0 and 5
  const generateRandomNum = () => {
    return Math.floor(Math.random() * 6);
  };

  // Show random anecdote when button is clicked.
  const handleClick = () => {
    let randomNum = generateRandomNum();

    // If randomNum is same as selected, generate new random number
    while (randomNum === selected) {
      randomNum = generateRandomNum();
    }
    setSelected(randomNum);
  };

  const updateVote = () => {
    // Create copy of votes in state to prevent directly mutating state.
    let updatedVotes = [...votes];
    // Add the vote
    updatedVotes[selected]++;
    // Update the state with the new vote
    setVotes(updatedVotes);
  };

  // Update the most voted anecdote when votes change.
  useEffect(() => {
    // Return (first) index of biggest number
    const anecdote = votes.indexOf(Math.max(...votes));

    // If currently displayed most voted anecdote has same number of votes as newly returned most voted anecdote, do nothing.
    if (votes[anecdote] <= votes[mostVoted]) {
      return;
    }
    setMostVoted(anecdote);
  }, [votes, mostVoted]);

  return (
    <main className="anecdote-container">
      <Anecdote
        element="h1"
        title="Anecdote of the day"
        anecdote={props.anecdotes[selected]}
        voteScore={votes[selected]}
      />
      <Button className="btn" onClick={updateVote}>
        Vote
      </Button>
      <Button className="btn" onClick={handleClick}>
        Next anecdote
      </Button>
      {votes[mostVoted] === 0 ? null : (
        <Anecdote
          title="Anecdote with most votes"
          anecdote={props.anecdotes[mostVoted]}
          voteScore={votes[mostVoted]}
        />
      )}
    </main>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
