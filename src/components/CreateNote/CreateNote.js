import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import './CreateNote.css';
import Loader from '../ui/Loader/Loader';
import Input from '../ui/Input/Input';
import * as Validator from '../../utils/validator';
import { asyncCreateNote } from '../../store/actions/notes-actions';

class CreateNote extends Component {
	state = {
		note: {
			value: '',
			touched: false,
			valid: false,
			warning: 'Warning! Mustn\'t be empty.',
		}
	}

	handleTouch = () => {
		const touched = this.state.note.touched;

		if (!touched) {
			this.setState(state => ({
				...state,
				note: {
					...state.note,
					touched: true
				}
			}));
		}
	}

	handleFieldChange = event => {
		const value = event.target.value;

		this.setState(state => ({
			...state,
			note: {
				...state.note,
				value,
				valid: Validator.isRequired(value)
			}
		}));
	}

	handleSubmit = event => {
		event.preventDefault();

		const uid = this.props.user.uid;
		const timestamp = moment().valueOf();
		const note = this.state.note.value.trim();
		const data = {
			id: uuidv4(),
			note,
			completed: false,
			createdAt: timestamp,
			updatedAt: timestamp
		};

		this.props.onAsyncCreateNote(uid, data);
	}

	render() {
		const note = this.state.note;

		return (
			<div className="create-note">
				{
					this.props.authLoading || this.props.notesLoading ?
						<Loader /> :
						<Fragment>
							<i className="material-icons-round icon icon--big create-note__go-back">
								<Link to="/notes">arrow_back</Link>
							</i>
							<form onSubmit={this.handleSubmit} className="create-note__form">
								<h1 className="page-heading page-heading__margin--bottom">Create note</h1>
								<Input
									type="text"
									name="note"
									value={note.value}
									onChange={this.handleFieldChange}
									touched={note.touched}
									onBlur={this.handleTouch}
									valid={note.valid}
									required
									label="Note"
									hint={note.hint}
									warning={note.warning} />
								<button type="submit" disabled={!note.valid} className="btn--submit">Create note</button>
							</form>
						</Fragment>
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	authLoading: state.authState.loading,
	notesLoading: state.notesState.loading,
	user: state.authState.user
});

const mapDispatchToProps = dispatch => ({
	onAsyncCreateNote: (uid, data) => dispatch(asyncCreateNote(uid, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNote);
