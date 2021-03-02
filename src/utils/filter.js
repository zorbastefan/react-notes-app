const filter = (notes, filters) => {
	// const searchNotes = note.title.toLowerCase().includes(filters.searchText.toLowerCase());
	// const hideCompleted = filters.hideCompleted ? !note.completed : note;
	// const hideCompleted = !filters.hideCompleted || !note.completed;
	return notes.filter(note => {
		return note.note.toLowerCase().includes(filters.searchText.toLowerCase());
	}).filter(note => {
		return !filters.hideCompleted || !note.completed;
	}).sort((a, b) => {
		switch (filters.sortBy) {
			case 'created':
				if (a.createdAt < b.createdAt) {
					return 1;
				} else if (a.createdAt > b.createdAt) {
					return -1;
				} else {
					return 0;
				}
			case 'last-updated':
				if (a.updatedAt < b.updatedAt) {
					return 1;
				} else if (a.updatedAt > b.updatedAt) {
					return -1;
				} else {
					return 0;
				}
			case 'alphabetical-ascending':
				if (a.note.toLowerCase() > b.note.toLowerCase()) {
					return 1;
				} else if (a.note.toLowerCase() < b.note.toLowerCase()) {
					return -1;
				} else {
					return 0;
				}
			case 'alphabetical-descending':
				if (a.note.toLowerCase() < b.note.toLowerCase()) {
					return 1;
				} else if (a.note.toLowerCase() > b.note.toLowerCase()) {
					return -1;
				} else {
					return 0;
				}
			default:
				break;
		}
	});
};

export default filter;
