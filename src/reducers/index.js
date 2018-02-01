import { combineReducers } from 'redux';
//import WeatherReducer from './reducer_weather';
import DecksReducer from './reducer_decks';
import ActiveDeck from './reducer_active_deck';

const rootReducer = combineReducers({
	decks: DecksReducer,
	activeDeck: ActiveDeck
});

export default rootReducer;