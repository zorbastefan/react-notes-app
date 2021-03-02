import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Select.css';
import SelectItem from './SelectItem/SelectItem';

class Select extends Component {
	state = {
		showOptions: false
	}

	handleToggleOptions = () => {
		this.setState(state => ({ showOptions: !state.showOptions }));
	}

	render() {
		const { children, selected } = this.props;
		const selectListClassList = ['select__list'];
		const arrowClassList = ['material-icons-round', 'select__heading--arrow'];
		let selectedOption = null;

		if (this.state.showOptions) {
			selectListClassList.push('select__list--show');
			arrowClassList.push('select__heading--arrow--flipped');
		}

		switch (selected) {
			case 'created':
				selectedOption = 'Created';
				break;
			case 'last-updated':
				selectedOption = 'Last updated';
				break;
			case 'alphabetical-ascending':
				selectedOption = 'Alphabetically (ascending)';
				break;
			case 'alphabetical-descending':
				selectedOption = 'Alphabetically (descending)';
				break;
			default:
				break;
		}

		return (
			<div className="select">
				<div className="select__heading" onClick={this.handleToggleOptions}>
					<span className="select__heading--selected-option">
						{selectedOption}
					</span>
					<i className={arrowClassList.join(' ').trim()}>keyboard_arrow_down</i>
				</div>
				<ul className={selectListClassList.join(' ').trim()}>
					{
						React.Children.map(children, child => React.cloneElement(child, { selected }))
					}
				</ul>
			</div>
		);
	}
};

Select.propTypes = {
	selected: PropTypes.string.isRequired
};

export default Select;
