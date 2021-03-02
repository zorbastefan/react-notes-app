import React from 'react';
import PropTypes from 'prop-types';

import './SelectItem.css';

const SelectItem = props => {
	const { children, value, onSelect, selected } = props;
	const selecteItemClassList = ['select__item'];

	if (selected.trim() === value.trim()) {
		selecteItemClassList.push('select__item--selected');
	}

	return (
		<li className={selecteItemClassList.join(' ').trim()} onClick={() => onSelect(value)}>
			{children}
		</li>
	);
};

SelectItem.propTypes = {
	value: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

export default SelectItem;
