import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.css';

const Checkbox = props => {
	const {
		name,
		checked,
		onChange,
		label,
		className
	} = props;
	const checkboxClassList = ['checkbox'];

	if (className) {
		checkboxClassList.push(className);
	}

	return (
		<label className={checkboxClassList.join(' ').trim()}>
			<input type="checkbox" name={name} checked={checked} onChange={onChange} />
			<span>{label}</span>
		</label>
	);
};

Checkbox.propTypes = {
	name: PropTypes.string,
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string,
	className: PropTypes.string
};

export default Checkbox;
