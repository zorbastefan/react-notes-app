import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Auth from './components/Auth/Auth';
import Notes from './components/Notes/Notes';
import UpdateNote from './components/UpdateNote/UpdateNote';
import CreateNote from './components/CreateNote/CreateNote';

const App = () => {
  return (
    <div className="app">
			<Switch>
				<Route path="/" exact component={Auth} />
				<Route path="/notes" component={Notes} />
				<Route path="/create-note" component={CreateNote} />
				<Route path="/update-note/:id" component={UpdateNote} />
			</Switch>
		</div>
  );
}

export default App;
