// import facts_db from '../data/facts';


export default function(state = [], action) {
	switch(action.type) {
		case 'FETCH_DECKS':
		return action.payload.data;
		case 'CREATE_NEW_DECK':
		return [...state, action.payload.data];
		case 'DELETE_DECK':
		const deckId = action.payload.data;
		console.log(deckId);
		return state.filter(deck => deck._id !== deckId);
		case 'FETCH_DECK_BY_DECKNAME':
		const theName = action.payload.data;
		console.log(theName);
		return action.payload.data;
	}

	return state;
}

// import facts_db from '../data/facts';


// export default function() {
// 	return facts_db;
// }