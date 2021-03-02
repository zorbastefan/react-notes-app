import * as authActions from '../actions/auth-actions';

const initState = {
	user: null,
	error: null,
	loading: false
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case authActions.AUTH_START:
			return {
				...state, 
				loading: true
			};
		case authActions.AUTH_END:
			return {
				...state, 
				loading: false
			};
		case authActions.SET_USER:
			return {
				...state, 
				user: action.user
			};
		case authActions.REMOVE_USER:
			return {
				...state,
				user: null
			};
		case authActions.SET_ERROR:
			return {
				...state,
				error: action.error
			};
		case authActions.REMOVE_ERROR:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export default authReducer;
