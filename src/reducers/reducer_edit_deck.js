export default function(state = null, action) {
	switch(action.type) {
		case 'FETCH_DECK_BY_DECKNAME':
			console.log('fetch by deckname called');
			console.log(action.payload.data);
			return action.payload.data;
	}
	return state;
}
