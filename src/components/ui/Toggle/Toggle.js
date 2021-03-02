import React from 'react';
import PropTypes from 'prop-types';

import './Toggle.css';

const Toggle = props => {
	const {
		name,
		checked,
		onChange,
		label
	} = props;

	return (
		<label className="toggle">
			<input type="checkbox" name={name} checked={checked} onChange={onChange} />
			<span>{label}</span>
		</label>
	);
};

Toggle.propTypes = {
	name: PropTypes.string,
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string
};

export default Toggle;
