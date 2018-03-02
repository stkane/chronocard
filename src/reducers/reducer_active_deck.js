export default function(state = null, action) {
	switch(action.type) {
		case 'DECK_SELECTED':
			return action.payload;
		case 'DECK_DESELECTED':
			return null;
		case 'FETCH_DECK_BY_DECKNAME':
		const theName = action.payload.data;
		console.log(theName);
		return action.payload.data;
	}
	return state;
}