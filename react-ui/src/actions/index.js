import axios from 'axios';

const ROOT_URL = `/api/`;



export function fetchDecks(query) {
	const url = `${ROOT_URL}${query}`;
	console.log('fetch url:');
	console.log(url);
	const request = axios.get(url);
	console.log('this is the resolved fetch request: ');
	console.log(request);
	console.log('fetch decks is called');
	return {
		type: 'FETCH_DECKS',
		payload: request
	};

}

export function getDeckByDeckname(query) {
	const url = `${ROOT_URL}decks/deckname/${query}`;
	const request = axios.get(url);
	console.log('this is the url ' + url);
	console.log('this is the resolved request');
	console.log(request)
	return {
		type: 'FETCH_DECK_BY_DECKNAME',
		payload: request
	};
}

export function createNewDeck(deckname, author, subject, cards) {
	const url = `${ROOT_URL}newdeck`;
	console.log('new deck url:');
	console.log(url);
	const newDeck = {
		deckname: deckname,
		author: author,
		subject: subject,
		cards: cards
	}
	console.log('this is the newDeck variable to be sent via axios post');
	console.log(newDeck);
	const request = axios.post(url, newDeck);

	console.log('action creator request: ');
	console.log(request);
	console.log('new deck action called');
	return {
		type: 'CREATE_NEW_DECK',
		payload: request
	};
}



export function deleteDeck(deckId) {
	const url = `${ROOT_URL}decks/${deckId}`;
	const request = axios.delete(url);
	console.log('yes '+ url);
	return {
		type: 'DELETE_DECK',
		payload: request
	}
}

export function selectDeck(deck) {
	return {
		type: 'DECK_SELECTED',
		payload: deck
	};
}

export function deselectDeck() {
	return {
		type: 'DECK_DESELECTED',
		payload: null
	};
}
