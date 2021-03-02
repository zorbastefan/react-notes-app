import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

const Modal = props => {
	const { children } = props;

	return (
		<div className="modal">
			{children}
		</div>
	);
};

Modal.propTypes = {

};

export default Modal;
