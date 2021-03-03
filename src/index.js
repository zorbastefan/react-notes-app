import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// ...
import history from './utils/history';
import authReducer from './store/reducers/auth-reducer';
import notesReducer from './store/reducers/notes-reducer';
import { auth } from './utils/firebase';
import { authStart, authEnd, setUser } from './store/actions/auth-actions';
import { asyncFetchNotes } from './store/actions/notes-actions';

const reducer = combineReducers({
	authState: authReducer,
	notesState: notesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

auth.onAuthStateChanged(user => {
	store.dispatch(authStart());

	if (user) {
		console.log('Signed in.');

		const { uid, email, displayName, photoURL } = user;

		store.dispatch(setUser({ uid, email, displayName, photoURL }));
		store.dispatch(authEnd());

		if (history.location.pathname === '/') {
			history.push('/notes');
		}

		store.dispatch(asyncFetchNotes(uid));
	} else {
		console.log('Signed out.');

		store.dispatch(authEnd());
	}
});

const app = (
	<Provider store={store}>
		<Router history={history}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Router>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
