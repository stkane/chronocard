import axios from 'axios';

const ROOT_URL = `http://localhost:3030/api/`;



export function fetchDecks(query) {
	const url = `${ROOT_URL}${query}`;
	const request = axios.get(url);
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
	console.log(request)
	return {
		type: 'FETCH_DECK_BY_DECKNAME',
		payload: request
	};
}

export function createNewDeck(deckname, author, subject, cards) {
	const url = `${ROOT_URL}newdeck`;
	const newDeck = {
		deckname: deckname,
		author: author,
		subject: subject,
		cards: cards
	}
	const request = axios.post(url, newDeck);
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
