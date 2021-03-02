import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './NoteItem.css';

const NoteItem = props => {
	let { id, note, completed } = props;
	const noteItemClassList = ['note__item'];

	if (completed) {
		noteItemClassList.push('note__item--completed');
	}

	const checkNoteLength = note => {
		if (note.length > 50) {
			return note.slice(0, 47) + '...';
		}

		return note;
	}

	return (
		<li className={noteItemClassList.join(' ').trim()}>
			<Link to={{ pathname: '/update-note/' + id }}>
				{note}
			</Link>
		</li>
	);
};

NoteItem.propTypes = {
	id: PropTypes.string.isRequired,
	note: PropTypes.string,
	completed: PropTypes.bool.isRequired
};

export default NoteItem;
