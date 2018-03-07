// import facts_db from '../data/facts';


export default function(state = [], action) {
	switch(action.type) {
		case 'FETCH_DECKS':
		return action.payload.data;
		case 'CREATE_NEW_DECK':
		console.log('create new deck reducer called');
		console.log(action.payload.data);
		return [...state, action.payload.data];
		case 'DELETE_DECK':
		const deckId = action.payload.data;
		return state.filter(deck => deck._id !== deckId);
		
	}

	return state;
}

// import facts_db from '../data/facts';


// export default function() {
// 	return facts_db;
// }
