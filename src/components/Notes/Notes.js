import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Notes.css';
import Loader from '../ui/Loader/Loader';
import NoteItem from './NoteItem/NoteItem';
import Toggle from '../ui/Toggle/Toggle';
import Select from '../ui/Select/Select';
import SelectItem from '../ui/Select/SelectItem/SelectItem';
import { asyncLogout } from '../../store/actions/auth-actions';
import renderNotes from '../../utils/filter';
import { updateFilters } from '../../store/actions/notes-actions';

class Notes extends Component {
	state = {
		showFiltersMenu: false,
		showUserMenu: false
	}

	handleSearchText = event => {
		const filter = event.target.name;
		const newVal = event.target.value;

		this.props.onUpdateFilter(filter, newVal);
	}

	handleClearSearchText = () => {
		if (this.props.filters.searchText !== '') {
			this.props.onUpdateFilter('searchText', '');
		}
	}

	handleHideCompleted = event => {
		const filter = event.target.name;
		const newVal = event.target.checked;

		this.props.onUpdateFilter(filter, newVal);
	}

	handleSortBy = newVal => {
		this.props.onUpdateFilter('sortBy', newVal);
	}

	handleToggleFiltersBar = () => {
		this.setState(state => ({
			...state,
			showFiltersMenu: !state.showFiltersMenu
		}));
	}

	handleToggleUserBar = () => {
		this.setState(state => ({
			...state,
			showUserMenu: !state.showUserMenu
		}));
	}

	render() {
		const filtersMenuListClassList = ['menu__list filters-menu__list'];
		const userMenuListClassList = ['menu__list user-menu__list'];
		const url = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Favatar-icon-png-13.png&f=1&nofb=1';
		const notes = this.props.notes.map(note => (
			<NoteItem key={note.id} id={note.id} note={note.note} completed={note.completed} />
		));
		const { searchText, hideCompleted, sortBy } = this.props.filters;

		if (this.state.showFiltersMenu) {
			filtersMenuListClassList.push('menu__list--show filters-menu__list--show');
		}

		if (this.state.showUserMenu) {
			userMenuListClassList.push('menu__list--show user-menu__list--show');
		}

		return (
			<div className="notes">
				{
					this.props.authLoading || this.props.notesLoading ? 
					<Loader /> : 
					<Fragment>
						<h1 className="page-heading">Notes</h1>
						<div className="menu filters-menu">
							<i className="material-icons-round menu__button--icon" onClick={this.handleToggleFiltersBar}>sort</i>
							<ul className={filtersMenuListClassList.join(' ').trim()}>
								<li className="menu__item">
									<Toggle 
										name="hideCompleted" 
										checked={hideCompleted} 
										onChange={this.handleHideCompleted} 
										label="Hide completed notes" />
								</li>
								<li className="menu__item">
									<Select selected={sortBy}>
										<SelectItem 
											value="created" 
											onSelect={this.handleSortBy}>Created</SelectItem>
										<SelectItem 
											value="last-updated" 
											onSelect={this.handleSortBy}>Last updated</SelectItem>
										<SelectItem 
											value="alphabetical-ascending" 
											onSelect={this.handleSortBy}>Alphabetically (ascending)</SelectItem>
										<SelectItem 
											value="alphabetical-descending" 
											onSelect={this.handleSortBy}>Alphabetically (descending)</SelectItem>
									</Select>
								</li>
							</ul>
						</div>
						<div className="menu user-menu">
							<img 
								src={url} 
								alt="User photo" 
								className="material-icons-round menu__button--image user-menu__button--image" 
								onClick={this.handleToggleUserBar} />
							<ul className={userMenuListClassList.join(' ').trim()}>
								<li className="menu__item" onClick={this.props.onAsyncLogout}>Log out</li>
							</ul>
						</div>
						<div className="search-box">
							<input 
								type="text" 
								name="searchText"
								value={searchText}
								onChange={this.handleSearchText}
								className="search-text"
								placeholder="Search notes" />
							<i className="material-icons-round search-text__clear-icon" onClick={this.handleClearSearchText}>cancel</i>
						</div>
						<ul className="note__list">
							{notes}
						</ul>
						<i className="material-icons-round icon icon--big create-note__link">
							<Link to="/create-note">add</Link>
						</i>
					</Fragment>
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.authState.user,
	authLoading: state.authState.loading,
	notesLoading: state.notesState.loading,
	notes: renderNotes(state.notesState.notes, state.notesState.filters),
	filters: state.notesState.filters
});

const mapDispatchToProps = dispatch => ({
	onUpdateFilter: (filter, newVal) => dispatch(updateFilters(filter, newVal)),
	onAsyncLogout: () => dispatch(asyncLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
