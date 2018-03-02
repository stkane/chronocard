var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Deck = require('./models/deck');
var cors = require('cors');



//configure bodyparser, grabs data from body of post
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//set up port for server to listen on
var port = process.env.PORT || 3030;

//connet to DB

mongoose.connect('mongodb://localhost:27017/test_api_chrono');

var router = express.Router();

//routes will all be prefixed with /api
app.use('/api', router);

//middleware
//middleware is useful for validations, we can log
//things from here or stop the request from continuing
//in the even that the request is not safe.
//middleware to use for all requests

router.use(function(req, res, next) {
	console.log("there is some processing currently happening");
	next();
});

//test route
router.get('/', function(req, res) {
	res.json({message: 'Welcome to our API!'});
});


//create new deck
router.route('/newdeck')
	.post(function(req, res) {
		var deck = new Deck(); //new instance of a vehicle
		deck.deckname = req.body.deckname;
		deck.author = req.body.author;
		deck.subject = req.body.subject;
		deck.cards = [];

		deck.save(function(err){
			if(err){
				res.send(err);
			}
			res.json(deck);
		});
	});

//update cards array with new card
router.route('/:deck_id/cards')
	.put(function(req, res) {
		Deck.findById(req.params.deck_id, function(err, deck) {
			if(err) {
				res.send(err);
			} else {
				deck.cards.push({fact: req.body.fact, date: req.body.date});

			deck.save(function(err){
			if(err){
					res.send(err);
				}
				res.json({message: 'Card was sucessfully created and inserted'});
			});
		}
		})
	});

//get deck by deckname
router.route('/decks/deckname/:deckname')
	.get(function(req, res) {
		Deck.find({deckname:req.params.deckname}, function(err, deck) {
			if (err) {
				res.send(err);
			}
			res.json(deck);
		});
	});

//get all decks
router.route('/decks')
	.get(function(req, res) {
		Deck.find(function(err, deck) {
			if(err) {
				res.send(err);
			}
			res.json(deck);
		});
	});

//get deck by id
router.route('/decks/:deck_id')
	.get(function(req, res){
		Deck.findById(req.params.deck_id, function(err, deck) {
			if(err) {
				res.send(err);
			}
			res.json(deck);
		});
	});

router.route('/decks/author/:author')
	.get(function(req, res) {
		Deck.find({author:req.params.author}, function(err, deck) {
			if (err) {
				res.send(err);
			}
			res.json(deck);
		});
	});

router.route('/decks/subject/:subject')
	.get(function(req, res) {
		Deck.find({subject:req.params.subject}, function(err, deck) {
			if (err) {
				res.send(err);
			}
			res.json(deck);
		});
	});

router.route('/decks/:deck_id')
	.delete(function(req, res) {
		Deck.findById(req.params.deck_id, function(err, deck) {
			if (err) {
				res.send(err);
			}
			deck.remove(function(err, deck) {
				if(err) {
					res.send(err);
				}
				res.json(req.params.deck_id);
			})
		});
	});

app.listen(port);

console.log('server listening on port ' + port);














