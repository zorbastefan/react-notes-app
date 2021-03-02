import React from 'react';
import PropTypes from 'prop-types';

import './Radio.css';

const Radio = props => {
	const {
		value,
		onChange,
		name,
		label
	} = props;

	return (
		<label className="radio">
			<input type="radio" name={name} value={value} onChange={onChange} />
			<span>{label}</span>
		</label>
	);
};

Radio.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.string
};

export default Radio;
