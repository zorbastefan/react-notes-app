import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Auth from './components/Auth/Auth';
import Notes from './components/Notes/Notes';
import UpdateNote from './components/UpdateNote/UpdateNote';
import CreateNote from './components/CreateNote/CreateNote';
import NoMatch from './components/NoMatch/NoMatch';

function App(props) {
	let routes = null;

	if (props.user) {
		routes = (
			<Switch>
				<Route path="/notes" component={Notes} />
				<Route path="/create-note" component={CreateNote} />
				<Route path="/update-note/:id" component={UpdateNote} />
				<Route path="*" component={NoMatch} />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact component={Auth} />
				<Route path="*" component={NoMatch} />
			</Switch>
		);
	}

	return (
		<div className="app">
			{routes}
		</div>
	);
}

const mapStateToProps = state => ({
	user: state.authState.user
});

export default connect(mapStateToProps)(App);
