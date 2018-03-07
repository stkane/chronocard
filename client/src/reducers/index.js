import { combineReducers } from 'redux';
//import WeatherReducer from './reducer_weather';
import DecksReducer from './reducer_decks';
import ActiveDeck from './reducer_active_deck';
import EditDeckReducer from './reducer_edit_deck';

const rootReducer = combineReducers({
	decks: DecksReducer,
	activeDeck: ActiveDeck,
	editDeck: EditDeckReducer
});

export default rootReducer;