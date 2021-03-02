import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = props => {
	const {
		type, 
		name, 
		value, 
		onChange, 
		touched, 
		onBlur, 
		valid, 
		required, 
		label, 
		icon, 
		iconOnClick, 
		hint, 
		warning,
		className
	} = props;
	const inputClassList = ['form__field__input'];
	const labelClassList = ['form__field__label'];
	const iconClassList = ['material-icons-round', 'form__field__icon'];
	const hintClassList = ['form__field__hint'];
	const warningClassList = ['form__field__warning'];

	if (touched && !valid) {
		inputClassList.push('form__field__input--invalid');
		labelClassList.push('form__field__label--invalid');
		iconClassList.push('form__field__icon--invalid');
		hintClassList.push('form__field__hint--hide');
		warningClassList.push('form__field__warning--show');
	}

	if (className) {
		inputClassList.push(className);
	}

	return (
		<div className="form__field">
			<input 
				type={type} 
				name={name} 
				autoComplete="off"
				value={value} 
				onChange={onChange} 
				onBlur={onBlur} 
				className={inputClassList.join(' ').trim()} 
				placeholder=" " />
			{
				label ? 
				<label className={labelClassList.join(' ').trim()}>
					{label}
					{
						required ? 
						<span className="form__field__required">*</span> : 
						null
					}
				</label> : 
				null
			}
			{
				icon ? 
				<i className={iconClassList.join(' ').trim()} onClick={iconOnClick}>
					{icon}
				</i> : 
				null
			}
			{
				<Fragment>
					<div className={warningClassList.join(' ').trim()}>
						{warning}
					</div>
					<div className={hintClassList.join(' ').trim()}>
						{hint}
					</div>
				</Fragment>
			}
		</div>
	);
};

Input.propTypes = {
	type: PropTypes.string, 
	name: PropTypes.string, 
	value: PropTypes.string.isRequired, 
	onChange: PropTypes.func.isRequired, 
	touched: PropTypes.bool.isRequired, 
	onBlur: PropTypes.func.isRequired, 
	required: PropTypes.bool, 
	label: PropTypes.string, 
	icon: PropTypes.string, 
	iconOnClick: PropTypes.func, 
	hint: PropTypes.string, 
	warning: PropTypes.string,
	className: PropTypes.string
};

export default Input;
