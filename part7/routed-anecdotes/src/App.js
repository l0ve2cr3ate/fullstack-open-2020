import React, { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Anecdote from "./components/Anecdote";
import CreateNew from "./components/CreateNew";
import Menu from "./components/Menu";
import "./App.css";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import Footer from "./components/Footer";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");

  const match = useRouteMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null;

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));

    setNotification(`New anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification("");
    }, 10000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div className="page-wrapper">
      <h1>Software anecdotes</h1>
      <Menu />
      <main className="main">
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdote={anecdote} />
          </Route>

          <Route exact path="/create">
            <CreateNew addNew={addNew} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <AnecdoteList notification={notification} anecdotes={anecdotes} />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
