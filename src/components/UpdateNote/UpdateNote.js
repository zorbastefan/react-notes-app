import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './UpdateNote.css';
import Loader from '../ui/Loader/Loader';
import Input from '../ui/Input/Input';
import Checkbox from '../ui/Checkbox/Checkbox';
import * as Validator from '../../utils/validator';
import { asyncDeleteNote, asyncUpdateNote, updateNote } from '../../store/actions/notes-actions';

class UpdateNote extends Component {
	state = {
		note: {
			touched: false, 
			valid: false, 
			warning: 'Warning! Mustn\'t be empty.', 
		}
	}

	componentDidMount() {
		if (this.props.note) {
			this.setState(state => ({
				...state,
				note: {
					...state.note,
					valid: Validator.isRequired(this.props.note.note)
				}
			}));
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.note !== prevProps.note && this.props.note) {
			this.setState(state => ({
				...state,
				note: {
					...state.note,
					valid: Validator.isRequired(this.props.note.note)
				}
			}));
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
		const name = event.target.name;
		let newVal;

		switch (name) {
			case 'note':
				newVal = event.target.value;
				break;
			case 'completed':
				newVal = event.target.checked;
				break
			default:
				break;
		}

		const updatedNote = {
			...this.props.note,
			[name]: newVal
		};

		this.props.onUpdateNote(this.props.note.id, updatedNote);
	}

	handleDeleteNote = () => {
		const goForward = window.confirm('Do you want to delete this note');
		
		if (goForward) {
			if (this.props.user && this.props.note) {
				this.props.onAsyncDeleteNote(this.props.user.uid, this.props.note.id);
			}
		}
	}

	handleSubmit = event => {
		event.preventDefault();

		const timestamp = moment().valueOf();
		const updatedNote = {
			...this.props.note,
			note: this.props.note.note.trim(),
			updatedAt: timestamp
		};

		if (this.props.user) {
			console.log(updatedNote);
			this.props.onAsyncUpdateNote(this.props.user.uid, updatedNote);
		}
	}

	render() {
		const note = this.props.note;
		const noteField = this.state.note;

		return (
			<div className="update-note">
				{
					this.props.authLoading || this.props.notesLoading ? 
					<Loader /> : 
					<Fragment>
							<i className="material-icons-round icon icon--big update-note__go-back">
								<Link to="/notes">arrow_back</Link>
							</i>
							<h1 className="page-heading update-note__page-heading">Update note</h1>
							<form onSubmit={this.handleSubmit} className="update-note__form">
								<Input 
									type="text" 
									name="note" 
									value={note ? note.note : ''}
									onChange={this.handleFieldChange} 
									touched={noteField.touched} 
									onBlur={this.handleTouch} 
									valid={noteField.valid} 
									required 
									label="Note" 
									hint={noteField.hint} 
									warning={noteField.warning}
									className="update-note__note" />
								<Checkbox
									name="completed"
									checked={note ? note.completed : false}
									onChange={this.handleFieldChange}
									label="Mark completed"
									className="update-note__completed" />
								<button 
									type="submit" 
									className="btn--submit update-note__submit"
									disabled={!noteField.valid}>Update note</button>
							</form>
							<i
								className="material-icons-round icon icon--big update-note__delete-note"
								onClick={this.handleDeleteNote}>delete</i>
					</Fragment>
				}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	authLoading: state.authState.loading,
	notesLoading: state.notesState.loading,
	user: state.authState.user,
	note: state.notesState.notes.find(note => note.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
	onUpdateNote: (id, updatedNote) => dispatch(updateNote(id, updatedNote)),
	onAsyncUpdateNote: (uid, updatedNote) => dispatch(asyncUpdateNote(uid, updatedNote)),
	onAsyncDeleteNote: (uid, id) => dispatch(asyncDeleteNote(uid, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNote);
