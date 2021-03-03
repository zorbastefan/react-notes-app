import { auth } from '../../utils/firebase';
import history from '../../utils/history';

export const AUTH_START = 'AUTH_START';
export const AUTH_END = 'AUTH_END';
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const authStart = () => ({ type: AUTH_START });
export const authEnd = () => ({ type: AUTH_END });
export const setUser = user => ({ type: SET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const setError = error => ({ type: SET_ERROR, error });
export const removeError = () => ({ type: REMOVE_ERROR });

export const asyncAuth = (registration, data) => {
	const { email, password } = data;

	return dispatch => {
		dispatch(authStart());

		let mode = null;

		if (registration) {
			mode = auth.createUserWithEmailAndPassword(email, password);
		} else {
			mode = auth.signInWithEmailAndPassword(email, password);
		}

		mode
			.then(response => {
				// console.log(response);
				const { uid, email, displayName, photoURL } = response.user;

				dispatch(removeError());
				dispatch(setUser({ uid, email, displayName, photoURL }));
				dispatch(authEnd());

				history.push('/notes');
			})
			.catch(error => {
				console.log(error);

				dispatch(setError(error.message));
				dispatch(authEnd());
			});
	};
};

export const asyncLogout = () => {
	return dispatch => {
		dispatch(authStart());

		auth
			.signOut()
			.then(response => {
				// console.log(response);

				dispatch(removeUser());
				dispatch(authEnd());

				history.push('/');
			})
			.catch(error => {
				console.log(error);

				dispatch(setError(error.message));
				dispatch(authEnd());
			})
	};
};
