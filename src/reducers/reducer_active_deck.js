export default function(state = null, action) {
	switch(action.type) {
		case 'DECK_SELECTED':
			return action.payload;
		case 'DECK_DESELECTED':
			return null;
	}
	return state;
}