import { db } from '../../utils/firebase';
import history from '../../utils/history';

export const REQUEST_START = 'REQUEST_START';
export const REQUEST_END = 'REQUEST_END';
export const CRAETE_NOTE = 'CRAETE_NOTE';
export const FETCH_NOTES = 'FETCH_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';
export const UPDATE_FILTERS = 'UPDATE_FILTERS';

const requestStart = () => ({ type: REQUEST_START });
const requestEnd = () => ({ type: REQUEST_END });
const createNote = note => ({ type: CRAETE_NOTE, note });
const fetchNotes = notes => ({ type: FETCH_NOTES, notes });
export const updateNote = (id, updatedNote) => ({ type: UPDATE_NOTE, id, updatedNote });
const deleteNote = id => ({ type: DELETE_NOTE, id });
const setError = error => ({ type: SET_ERROR, error });
const removeError = () => ({ type: REMOVE_ERROR });
export const updateFilters = (filter, newVal) => ({ type: UPDATE_FILTERS, filter, newVal });

export const asyncCreateNote = (uid, data) => {
	const { id, note, completed, createdAt, updatedAt } = data;

	return dispatch => {
		dispatch(requestStart());

		db
			.ref(`notes/${uid}/${id}`)
			.set({ note, completed, createdAt, updatedAt })
			.then(response => {
				// console.log(response);

				dispatch(createNote(data));
				dispatch(removeError());
				dispatch(requestEnd());

				history.push('/notes');
			})
			.catch(error => {
				console.log(error);

				dispatch(setError(error.message));
				dispatch(requestEnd());
			});
	};
};

export const asyncFetchNotes = uid => {
	return dispatch => {
		dispatch(requestStart());

		db
			.ref(`notes/${uid}`)
			.once('value')
			.then(response => {
				// console.log(response);

				const notes = [];

				for (const key in response.val()) {
					if (Object.hasOwnProperty.call(response.val(), key)) {
						const element = response.val()[key];
						element.id = key;
						notes.push(element);
					}
				}

				dispatch(removeError());
				dispatch(fetchNotes(notes));
				dispatch(requestEnd());
			})
			.catch(error => {
				console.log(error);

				dispatch(requestEnd());
				dispatch(setError(error.message));
			});
	};
};

export const asyncUpdateNote = (uid, updatedNote) => {
	const { id, note, completed, createdAt, updatedAt } = updatedNote;

	return dispatch => {
		dispatch(requestStart());

		db
			.ref(`notes/${uid}/${id}`)
			.set({ note, completed, createdAt, updatedAt })
			.then(response => {
				// console.log(response);

				dispatch(removeError());
				dispatch(updateNote(id, { id, note, completed, createdAt, updatedAt }));
				dispatch(requestEnd());

				history.push('/notes');
			})
			.catch(error => {
				console.log(error);

				dispatch(setError(error.message));
				dispatch(requestEnd());
			});
	};
};

export const asyncDeleteNote = (uid, id) => {
	return dispatch => {
		dispatch(requestStart());

		db
			.ref(`notes/${uid}/${id}`)
			.remove()
			.then(response => {
				// console.log(response);

				dispatch(deleteNote(id));
				dispatch(requestEnd());
				
				history.push('/notes');
			})
			.catch(error => {
				console.log(error);

				dispatch(setError(error.message));
				dispatch(requestEnd());
			})
	};
};
