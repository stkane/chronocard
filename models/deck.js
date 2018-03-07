var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
	fact: String,
	date: Number
})

var DeckSchema = new Schema({
	deckname: String,
	author: String,
	subject: String,
	cards: [CardSchema]
});

module.exports = mongoose.model('Deck', DeckSchema);
