import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './Auth.css';
import Loader from '../ui/Loader/Loader';
import Input from '../ui/Input/Input';
import * as Validator from '../../utils/validator';
import { asyncAuth } from '../../store/actions/auth-actions';

class Auth extends Component {
	state = {
		email: {
			value: '',
			touched: false,
			valid: false,
			hint: 'ex. test@mail.com',
			warning: 'Warning! Invalid email field.',
		},
		password: {
			value: '',
			touched: false,
			valid: false,
			hint: 'ex. Password5@',
			warning: 'Warning! Invalid password field.',
			showPassword: false
		},
		registration: false
	}

	handleMode = () => {
		this.setState(state => ({
			...state,
			registration: !state.registration
		}));
	}

	handleTouch = event => {
		const name = event.target.name;
		const field = this.state[name];

		if (!field.touched) {
			this.setState(state => ({
				...state,
				[name]: {
					...state[name],
					touched: true
				}
			}));
		}
	}

	hadnleShowPassword = () => {
		this.setState(state => ({
			...state,
			password: {
				...state.password,
				showPassword: !state.password.showPassword
			}
		}));
	}

	handleFieldChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		switch (name) {
			case 'email':
				this.setState(state => ({
					...state,
					[name]: {
						...state[name],
						value,
						valid: Validator.isEmail(value)
					}
				}));
				break;
			case 'password':
				this.setState(state => ({
					...state,
					[name]: {
						...state[name],
						value,
						valid: Validator.isPassword(value)
					}
				}));
			default:
				break;
		}
	}

	handleSubmit = event => {
		event.preventDefault();

		const email = this.state.email.value.trim();
		const password = this.state.password.value.trim();

		this.props.onAsyncAuth(this.state.registration, { email, password });
	}

	render() {
		const email = this.state.email;
		const password = this.state.password;
		const registration = this.state.registration;

		return (
			<div className="auth">
				{
					this.props.loading ?
						<Loader /> :
						<Fragment>
							<h1 className="page-heading auth__page-heading">
								{
									registration ?
										'Register' :
										'Log in'
								}
							</h1>
							<form onSubmit={this.handleSubmit} className="auth__form">
								<Input
									type="email"
									name="email"
									value={email.value}
									onChange={this.handleFieldChange}
									touched={email.touched}
									onBlur={this.handleTouch}
									valid={email.valid}
									required
									label="Email"
									hint={email.hint}
									warning={email.warning} />
								<Input
									type={password.showPassword ? 'text' : 'password'}
									name="password"
									value={password.value}
									onChange={this.handleFieldChange}
									touched={password.touched}
									onBlur={this.handleTouch}
									valid={password.valid}
									required
									label="Password"
									icon={password.showPassword ? 'visibility_off' : 'visibility'}
									iconOnClick={this.hadnleShowPassword}
									hint={password.hint}
									warning={password.warning} />
								<button type="submit" disabled={!email.valid || !password.valid} className="btn--submit">
									{
										registration ?
											'Register' :
											'Log in'
									}
								</button>
								<button type="button" className="btn--unstyled" style={{ float: 'left' }}>Forgot password?</button>
								<button type="button" className="btn--unstyled" style={{ float: 'right' }} onClick={this.handleMode}>
									{
										registration ?
											'Log in instead' :
											'Register instead'
									}
								</button>
							</form>
						</Fragment>
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.authState.loading
});

const mapDispatchToProps = dispatch => ({
	onAsyncAuth: (registration, data) => dispatch(asyncAuth(registration, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
