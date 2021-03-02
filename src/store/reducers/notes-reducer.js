import * as notesActions from '../actions/notes-actions';

const initState = {
	notes: [],
	filters: {
		searchText: '',
		hideCompleted: false,
		sortBy: 'created'  // created, last-updated, alphabetical-ascending, alphabetical-descending
	},
	error: null,
	loading: false
};

const notesReducer = (state = initState, action) => {
	switch (action.type) {
		case notesActions.REQUEST_START:
			return {
				...state,
				loading: true
			};
		case notesActions.REQUEST_END:
			return {
				...state,
				loading: false
			};
		case notesActions.CRAETE_NOTE:
			return {
				...state,
				notes: state.notes.concat(action.note)
			};
		case notesActions.FETCH_NOTES:
			return {
				...state,
				notes: action.notes
			};
		case notesActions.UPDATE_NOTE:
			return {
				...state, 
				notes: state.notes.map(note => {
					if (note.id === action.id) {
						note = action.updatedNote
					}

					return note;
				})
			};
		case notesActions.DELETE_NOTE:
			return {
				...state,
				notes: state.notes.filter(note => note.id !== action.id)
			};
		case notesActions.SET_ERROR:
			return {
				...state,
				error: action.error
			};
		case notesActions.REMOVE_ERROR:
			return {
				...state,
				error: null
			};
		case notesActions.UPDATE_FILTERS:
			return {
				...state,
				filters: {
					...state.filters,
					[action.filter]: action.newVal
				}
			};
		default:
			return state;
	}
};

export default notesReducer;
